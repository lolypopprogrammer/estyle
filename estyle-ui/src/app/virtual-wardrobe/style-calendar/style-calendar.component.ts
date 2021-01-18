import { Component, HostListener, OnInit } from '@angular/core';
import {
  CalendarView,
  CalendarEvent,
  CalendarDateFormatter,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { ApiService } from '../../core/services/api/api.service';
import { formatDate } from '@angular/common';

export enum ACTION_TYPES {
  'CHANGE_DAY_OUTFIT' = 'Change day outfit',
  'ADD_DAY_OUTFIT' = 'Add day outfit',
}

export interface WardrobeItemApiInterface {
  id: string;
  author: string;
  date: string;
  outfit: {
    _id: string;
    pictures: string[];
  };
}

export interface DaySliderInterface {
  date: string;
  currentOutfitIndex: number;
  count: number;
}

@Component({
  selector: 'app-virtual-wardrobe-style-calendar',
  templateUrl: './style-calendar.component.html',
  styleUrls: ['./style-calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class StyleCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  dateFormat = 'MM/dd/yyyy';

  currentPopupAction: ACTION_TYPES;
  private changingOutfit;

  popupPositionX = 0;
  popupPositionY = 0;
  popupIsVisible = false;
  popupId = 'calendar-popup';
  outfits = [];

  selectedDate: Date = new Date();
  selectedOutfit: any;
  monthOutfits = {};
  monthOutfitsSliderData: Array<DaySliderInterface> = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getMyOutfits({ limit: 10 }).subscribe((data: any) => {
      this.outfits = data.data;
    });

    this.loadCalendarOutfits();
  }

  loadCalendarOutfits() {
    this.api
      .getMyWardrobeCalendar(
        this.api.currenUser.id,
        this.viewDate.getMonth() + 1,
        this.viewDate.getFullYear()
      )
      .subscribe((items: Array<WardrobeItemApiInterface>) => {
        this.normalizeWardrobeCalendar(items);
      });
  }

  normalizeWardrobeCalendar(items: Array<WardrobeItemApiInterface>) {
    const wardrobeCalendar = {};
    items.forEach((item) => {
      const date = this.getFormattedDate(new Date(item.date));
      if (!wardrobeCalendar[date]) {
        wardrobeCalendar[date] = [];
      }

      wardrobeCalendar[date].push({
        picture: this.getOutfitPictureURI(item.outfit),
        id: item.id,
      });
    });

    this.monthOutfits = wardrobeCalendar;

    this.refreshSlideData();
  }

  calendarMonthChanged() {
    this.loadCalendarOutfits();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    const isStateBtn = event.target.id === this.popupId;
    if (!isStateBtn && this.popupIsVisible) this.hidePopup();
  }

  refreshSlideData() {
    this.monthOutfitsSliderData = [];
    const newSliderData = [];
    for (const [date, outfits] of Object.entries(this.monthOutfits)) {
      const sliderData = this.getSliderDataByDate(new Date(date));
      const sliderIndex = sliderData ? sliderData.currentOutfitIndex : 0;

      newSliderData.push({
        date: date,
        currentOutfitIndex: sliderIndex,
        count: outfits['length'],
      });
    }

    this.monthOutfitsSliderData = newSliderData;

    this.refresh.next();
  }

  showPopup(x: number = null, y: number = null) {
    this.popupIsVisible = true;
    if (x) {
      this.popupPositionX = x + 5;
    }
    if (y) {
      this.popupPositionY = y + 5;
    }
  }

  hidePopup() {
    this.popupIsVisible = false;
  }

  dayNumberClicked(e) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.selectedDate = date;
    this.selectedOutfit = null;
  }

  getOutfitByDate(date: Date) {
    return this.monthOutfits[this.getFormattedDate(date)];
  }

  getCurrentDisplayOutfitByDate(date: Date) {
    const outfits = this.getOutfitByDate(date);
    const sliderData = this.getSliderDataByDate(date);

    if (outfits && sliderData) {
      return outfits[sliderData.currentOutfitIndex];
    }
  }

  popupOutfitClicked(outfit: any) {
    this.selectedOutfit = outfit;
    this.selectOutfit(outfit);
  }

  selectOutfit(outfitForSelect: object) {
    if (outfitForSelect) {
      this.outfits = this.outfits.map((outfit: object) => {
        outfit['selected'] = outfitForSelect['id'] === outfit['id'];
        return outfit;
      });
    }
  }

  clearSelectedOutfit() {
    this.outfits = this.outfits.map((outfit: object) => {
      outfit['selected'] = false;
      return outfit;
    });
  }

  getFormattedDate(date: Date): string {
    return formatDate(date, this.dateFormat, 'en-US');
  }

  getCountOutfitsOfDate(date: Date): number {
    const outfits = this.getOutfitByDate(date);
    return outfits ? outfits.length : 0;
  }

  getDayImage(date: Date): string {
    const sliderData = this.getSliderDataByDate(date);
    if (sliderData && sliderData.count > 0) {
      const outfit = this.getOutfitByDate(date);
      if (outfit && outfit[sliderData.currentOutfitIndex]) {
        return outfit[sliderData.currentOutfitIndex].picture;
      }
    }
    return ' ';
  }

  getOutfitPictureURI(outfit: any): string {
    return encodeURI(outfit['pictures'][0]);
  }

  popupButtonClicked() {
    this.hidePopup();
    if (this.selectedOutfit) {
      switch (this.currentPopupAction) {
        case ACTION_TYPES.ADD_DAY_OUTFIT:
          this.addOutfitToDay(this.selectedOutfit, this.selectedDate);
          break;
        case ACTION_TYPES.CHANGE_DAY_OUTFIT:
          this.changeDayOutfit(this.selectedOutfit, this.selectedDate);
          break;
      }
    }
  }

  changeDayOutfit(outfit, date: Date) {
    this.api
      .patchWardrobeCalendarDay(this.changingOutfit.id, { outfit: outfit.id })
      .subscribe(() => {
        this.changingOutfit.picture = this.getOutfitPictureURI(outfit);
        this.changingOutfit.id = outfit.id;

        this.loadCalendarOutfits();
      });
  }

  addOutfitToDay(outfit, date: Date) {
    this.api
      .postWardrobeCalendarDay({
        outfit: outfit.id,
        date: date,
      })
      .subscribe((data) => {
        const dateOutfits = this.getOutfitByDate(date);
        if (dateOutfits) {
          dateOutfits.push({
            id: outfit.id,
            picture: this.getOutfitPictureURI(outfit),
          });
        } else {
          this.monthOutfits[this.getFormattedDate(date)] = [
            { id: outfit.id, picture: this.getOutfitPictureURI(outfit) },
          ];
        }
        this.loadCalendarOutfits();
      });
  }

  getSliderDataByDate(date: Date) {
    const formatDate = this.getFormattedDate(date);
    return this.monthOutfitsSliderData.find((v) => v.date === formatDate);
  }

  nextDayOutfit(date: Date) {
    const sliderData = this.getSliderDataByDate(date);
    if (sliderData && sliderData.currentOutfitIndex < sliderData.count - 1) {
      sliderData.currentOutfitIndex++;
      this.selectOutfit(this.getCurrentDisplayOutfitByDate(date));
    }
  }

  prevDayOutfit(date: Date) {
    const sliderData = this.getSliderDataByDate(date);
    if (sliderData && sliderData.currentOutfitIndex > 0) {
      sliderData.currentOutfitIndex--;
      this.selectOutfit(this.getCurrentDisplayOutfitByDate(date));
    }
  }

  onAddOutfitToDayClicked(date: Date, $event: MouseEvent) {
    this.showPopup($event['layerX'], $event['layerY']);
    this.currentPopupAction = ACTION_TYPES.ADD_DAY_OUTFIT;
    this.clearSelectedOutfit();
  }

  onEditDayOutfitClicked(date: Date, $event: MouseEvent) {
    this.showPopup($event['layerX'], $event['layerY']);
    this.currentPopupAction = ACTION_TYPES.CHANGE_DAY_OUTFIT;
    this.changingOutfit = this.getCurrentDisplayOutfitByDate(date);
    this.selectOutfit(this.changingOutfit);
  }

  onRemoveDayOutfitClicked(date: Date, $event: MouseEvent) {
    const outfitForRemove = this.getCurrentDisplayOutfitByDate(date);
    this.api.deleteWardrobeCalendarDay(outfitForRemove.id).subscribe(() => {
      let outfits = this.getOutfitByDate(date);
      this.monthOutfits[this.getFormattedDate(date)] = outfits.filter(
        (o) => o.id !== outfitForRemove.id
      );
      this.loadCalendarOutfits();
    });
  }

  calendarDayMouseEnter($event: MouseEvent) {
    $event.target['classList'].add('active');
  }

  calendarDayMouseLeave($event: MouseEvent) {
    $event.target['classList'].remove('active');
  }
}
