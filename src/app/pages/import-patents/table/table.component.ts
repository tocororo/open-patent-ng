import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  @Input() dataSource
  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    "titulo",
    "autores",
    "afiliaciones",
    "resumen",
    "fecha_publicacion"
  ];

  pageSize: number = 5;
  pageIndex: number = 0;

  ngOnInit(){
  }

}
