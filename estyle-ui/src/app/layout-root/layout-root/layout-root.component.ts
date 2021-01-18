import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout-root',
  templateUrl: './layout-root.component.html',
  styleUrls: ['./layout-root.component.scss']
})
export class LayoutRootComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

  isNoVirtualWardrobePage() {
    return this.router.url !== '/virtual-wardrobe';
  }
}
