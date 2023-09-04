import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-csv-table",
  templateUrl: "./csv-table.component.html",
  styleUrls: ["./csv-table.component.scss"],
})
export class CsvTableComponent implements OnInit {
  @Input() dataSource
  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    "nombre",
    "apellido1",
    "apellido2",
    "idExpediente",
    "noCi",
    "pais",
    "sexo",
    "institutional_email",
    "externals_email",
    "aliases",
  ];

  constructor() {}

  ngOnInit() {
    console.log(this.dataSource.data);

    this.dataSource.data.shift();
    this.dataSource.data = this.dataSource.data.map((ele) => {
      let item = {};
      this.displayedColumns.forEach((col) => {
        // if (typeof ele[col] === "string") {
        //   item[col] = ele[col].decode("utf-8");
        // } else
        item[col] = ele[col];
      });
      return { ...item };
    });
    console.log(this.dataSource.data);
  }
}
