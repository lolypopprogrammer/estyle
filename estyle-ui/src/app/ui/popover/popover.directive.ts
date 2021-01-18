import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';
import {createPopper} from "@popperjs/core";

@Directive({
  selector: '[appPopover]'
})
export class PopoverDirective implements AfterViewInit {
  @Input() popoverTarget: any;

  constructor(private el: ElementRef,
              private renderer: Renderer2
  ) {
  }

  ngAfterViewInit(): void {
  }

  @HostListener('mouseover', ['$event'])
  onMouseenter(e) {
    const target = this.el.nativeElement;
    const tooltip = this.popoverTarget;

    createPopper(target, tooltip, {
      placement: 'left',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ]
    });

    this.show();
  }

  @HostListener('mouseout', ['$event'])
  onMouseover(e) {
    this.hide();
  }

  show() {
    this.renderer.setStyle(this.popoverTarget, 'display', 'block');
  }

  hide() {
    this.renderer.setStyle(this.popoverTarget, 'display', 'none');
  }

}
