import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../core/services/api/api.service';

const CARDS = [
  {
    image: 'http://dayside-moonshot.office.uxcandy.com/estyle_assets/casual.jpg',
    title: 'Casual',
    href: '/',
    color: 'light',
    id: '5f7a0bb5bdd0ed1403739eed',
  },
  {
    image: 'http://dayside-moonshot.office.uxcandy.com/estyle_assets/business%202.jpg',
    title: 'Business',
    href: '/',
    color: 'dark',
    id: '5f7a0bcabdd0ed1403739eee',
  },
  {
    image: 'http://dayside-moonshot.office.uxcandy.com/estyle_assets/night%20out.jpg',
    title: 'Night-out',
    href: '/',
    color: 'light',
    id: '5f7d7f0c4b347c2aee2d1fa7',
  },
  {
    image: 'http://dayside-moonshot.office.uxcandy.com/estyle_assets/beach%20wear.jpg',
    title: 'Beach Wear',
    href: '/',
    color: 'dark',
    id: '5f7d7f184b347c2aee2d1fa8',
  },
];

@Component({
  selector: 'app-virtual-wardrobe',
  templateUrl: './virtual-wardrobe.component.html',
  styleUrls: ['./virtual-wardrobe.component.scss'],
})
export class VirtualWardrobeComponent implements OnInit {
  cards: any = CARDS;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {}
}
