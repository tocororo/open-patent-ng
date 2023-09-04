import { HttpParams } from "@angular/common/http";
import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from "@angular/router";
import { OrgService } from "src/app/org.service";

import { AggregationsSelection, Organization, SearchResponse } from "toco-lib";

@Component({
  selector: "app-org-dialog",
  templateUrl: "./org-dialog.component.html",
  styleUrls: ["./org-dialog.component.scss"],
})
export class OrgDialogComponent {
  aggr_keys: Array<any>;
  search_type: Boolean = true;

  layoutPosition = [
    {
      name: "Derecha",
      layout: "row-reverse",
      aling: "center baseline",
      width: "22",
    },
    {
      name: "Izquierda",
      layout: "row",
      aling: "center baseline",
      width: "22",
    },
    {
      name: "Arriba",
      layout: "column",
      aling: "center center",
      width: "90",
    },
    {
      name: "Abajo",
      layout: "column-reverse",
      aling: "center center",
      width: "90",
    },
  ];
  currentlayout = this.layoutPosition[0];
  public changeLayoutPosition(index: number) {
    this.currentlayout = this.layoutPosition[index];
  }
  // end Layout stuff

  // begin paginator stuff
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 15, 25, 50, 100];
  // end paginator stuff

  query = "";
  aggrsSelection: AggregationsSelection = {};

  params: HttpParams;
  sr: SearchResponse<Organization>;
  queryParams: Params;
  navigationExtras: NavigationExtras;

  loading: boolean = true;
  selectedOrgs: any;

  @Input() multipleSelection: boolean = false;
  @Input() header: string = 'Seleccione la organización a que pertenecen las personas a importar.';

  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(
    private _cuorService: OrgService,
    public dialogRef: MatDialogRef<OrgDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.query = "";

    this.aggrsSelection["country"] = ["Cuba"]; //porque aun si cambian la url arriba seguira diciendo cuba
    this.updateFetchParams();
    this.fetchSearchRequest();
  }

  changeView(): void {
    this.search_type = !this.search_type;
  }

  private updateFetchParams() {
    this.params = new HttpParams();

    this.params = this.params.set("size", this.pageSize.toString(10));

    this.params = this.params.set("page", (this.pageIndex + 1).toString(10));

    this.params = this.params.set("q", this.query);

    for (const aggrKey in this.aggrsSelection) {
      this.aggrsSelection[aggrKey].forEach((bucketKey) => {
        if (aggrKey != "country") {
          this.params = this.params.set(aggrKey, bucketKey);
        }
      });
    }
    this.params = this.params.set("country", "Cuba");
  }

  public fetchSearchRequest() {
    this._cuorService.getOrganizations(this.params).subscribe(
      (response: SearchResponse<Organization>) => {
        // this.pageEvent.length = response.hits.total;
        this.sr = response;
        console.log(
          "🚀 ~ file: org-dialog.component.ts:115 ~ OrgDialogComponent ~ fetchSearchRequest ~ this.sr",
          this.sr
        );
        delete this.sr.aggregations["country"];
        this.aggr_keys = [
          //{value: this.sr.aggregations.country, key: 'País'},
          { value: this.sr.aggregations.state, key: "Provincia" },
          { value: this.sr.aggregations.status, key: "Estado" },
          { value: this.sr.aggregations.types, key: "Tipo" },
        ];
      },
      (error: any) => {
        console.log("ERROPR");
      },
      () => {
        console.log("END...");
        this.loading = false;
      }
    );
  }

  public pageChange(event?: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  public aggrChange(event /* ?: AggregationsSelection */): void {
    this.aggrsSelection = event;
  }

  queryChange(event?: string) {
    this.query = event;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    // console.log("window:resize", window.innerWidth);
    if (window.innerWidth <= 740) {
      this.drawer.opened = false;
    } else {
      this.drawer.opened = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkMultiple(e, org) {
    if (!this.selectedOrgs) {
      this.selectedOrgs = [];
    }

    if (e.checked === true) {
      this.selectedOrgs.push(org);
    }

    if (e.checked === false) {
      this.selectedOrgs = this.selectedOrgs.filter((ele) => ele.id !== org.id);
    }

    console.log(this.selectedOrgs);
  }

  checkSingle(e, org) {
    this.selectedOrgs = org;
  }
}
