import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuElement} from "../header.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent implements OnInit {
  @Input() menuItems: MenuElement[];

  constructor() { }

  ngOnInit() {
  }

}
