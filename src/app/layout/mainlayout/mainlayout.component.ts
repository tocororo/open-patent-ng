import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.scss']
})
export class MainlayoutComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  public get isHome()
  {
    return this._router.url === '/';
  }
}
