import { Component, OnInit } from '@angular/core';
import { IClothe } from '../browse-clothes.component';
import { BrowseClothesService } from '../browse-clothes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clothe-info',
  templateUrl: './clothe-info.component.html',
  styleUrls: ['./clothe-info.component.scss']
})
export class ClotheInfoComponent implements OnInit {
  clothe$: Observable<IClothe> = this.browseClothesService.selected$;

  constructor(private browseClothesService: BrowseClothesService) {
  }

  ngOnInit(): void {
  }

}
