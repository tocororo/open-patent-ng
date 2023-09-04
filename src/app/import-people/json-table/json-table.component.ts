import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-json-table',
  templateUrl: './json-table.component.html',
  styleUrls: ['./json-table.component.scss']
})
export class JsonTableComponent implements OnInit {

  @Input() dataSource
  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    "name",
    "lastName",
    "aliases",
    "gender",
    "country",
    "institutional_email",
    "emails",
  ];


  pageSize: number = 5;
  pageIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
