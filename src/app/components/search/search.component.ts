
import { HttpParams } from "@angular/common/http";
import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import { ActivatedRoute, NavigationExtras, Params, Router } from "@angular/router";

import { AggregationsSelection, SearchResponse } from "toco-lib";
import { PeopleService } from '../../people/people.service';
import { Person } from "../../people/person.entity";
import { OpenPatent } from '../../interfaces/open-patent.interface';
import { PatentService } from "../../services/patent.service";


/**
 * Represents a component that shows the result of a search based on aggregations.
 * The search result can be showed as a list or charts.
 */
@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
    /**
     * Represents the `QueryParamKey` enum for internal use.
     */
    // public readonly queryParamKey: typeof QueryParamKey;

    // /**
    //  * Represents the `ChartType` enum for internal use.
    //  */
    // public readonly chartType: typeof ChartType;

    /**
     * Indicates the search result type.
     * Its value is true if the search result is showed as a list.
     * Its value is false if the search result is showed as charts.
     * By default, its value is `true`.
     */
    public aggrKeys: Array<any>;

    patents: OpenPatent[] = [
      {
        title: "Iphone 14",
        author: "Steve Jobs",
        organization: "Apple",
        affiliations: ["Samsung", "Xiaomi"],
        summary: "Nuevo Iphone en el mercado con nuevas funcionalidades"
      },
      {
        title: "Samsung Galaxy 6",
        author: "",
        organization: "Samsung",
        affiliations: ["Apple"],
        summary: "Nuevo Samsung en el mercado con nuevas funcionalidades"
      },
      {
        title: "Televisor Apple",
        author: "Steve Jobs",
        organization: "Apple",
        affiliations: ["Samsung"],
        summary: "Nuevo televisor en el mercado con nuevas funcionalidades"
      }
    ];

    public pageSize: number;
    public pageIndex: number;
    public pageSizeOptions: number[];

    public query: string;
    public aggrsSelection: AggregationsSelection;

    /**
     * The search that was requested as an HTTP request/response body that represents serialized parameters.
     */
    private params: HttpParams;
    /**
     * Represents the response of the search.
     */
    // public sr: SearchResponse<OpenPatent>;
    public sr: SearchResponse<Person>;
    private navigationExtras: NavigationExtras;

    public loading: boolean;


    @ViewChild(MatDrawer)
    public drawer: MatDrawer;

    public constructor(
        private patentService: PatentService,
        private peopleService: PeopleService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {

    }

    public ngOnInit(): void {
        this.aggrKeys = undefined;
        // this.currentChartType = this.chartType.polar;

        this.pageSize = 5;
        this.pageIndex = 0;
        this.pageSizeOptions = [5, 15, 25, 50, 100];

        this.query = "";
        this.aggrsSelection = {};

        this.params = undefined;
        this.sr = undefined;
        this.navigationExtras = undefined;

        this.loading = true;

        this.activatedRoute.queryParamMap.subscribe({
            next: (initQueryParams) => {
                this.aggrsSelection = {};
                console.log(initQueryParams);


                for (let index = 0; index < initQueryParams.keys.length; index++) {
                    const key = initQueryParams.keys[index];

                    switch (key) {
                        case "size":
                            this.pageSize = Number.parseInt(initQueryParams.get(key));
                            break;

                        case "page":
                            this.pageIndex = Number.parseInt(initQueryParams.get(key));
                            break;

                        case "q":
                            this.query = initQueryParams.get(key);
                            break;

                        default:
                            if (!this.aggrsSelection.hasOwnProperty(key)) {
                                this.aggrsSelection[key] = [];
                            }
                            this.aggrsSelection[key].push(initQueryParams.get(key));
                            break;
                    }
                }

                this.updateFetchParams();
                this.fetchSearchRequested();
            },

            error: (e) => { },

            complete: () => { },
        });
    }


    /**
     * Updates the `params` that will be used to fetch the search.
     */
    private updateFetchParams(): void {
        this.params = new HttpParams();

        this.params = this.params.set("size", this.pageSize.toString(10));

        this.params = this.params.set("page", (this.pageIndex + 1).toString(10));

        this.params = this.params.set("q", this.query);
        for (const aggrKey in this.aggrsSelection)  /* this.queryParamKey.aggrsSel */ {
            this.aggrsSelection[aggrKey].forEach((bucketKey) => {
                this.params = this.params.set(aggrKey, bucketKey);
            });
        }
    }

    /**
     * Fetches the search that was requested using the `_params`.
     */
    private fetchSearchRequested(): void {
        this.peopleService.getPeople(this.params).subscribe(
            (response: SearchResponse<Person>) => {
                console.log('fetchSearchRequested', response);

                // this.pageEvent.length = response.hits.total;
                this.sr = response;


                // Los valores 'País', 'Provincia', etc. deben ser obtenidos genéricamente.
                this.aggrKeys = [
                    { value: this.sr.aggregations.country, key: 'País' },
                    { value: this.sr.aggregations.state, key: 'Provincia' },
                    { value: this.sr.aggregations.status, key: 'Estado' },
                    { value: this.sr.aggregations.types, key: 'Tipo' },
                ]
            },

            (error: any) => {
                console.log("Error in `_fetchSearchRequested` method.");
            },

            () => {
                console.log("Finish the `_fetchSearchRequested` method.");
                this.loading = false;
            }
        );

        // this.patentService.getPatents(this.params).subscribe((response: SearchResponse<OpenPatent>) => {
        //   console.log('Busqueda realizada');
        //   this.sr = response;
        // });

    }

    public pageChange(event?: PageEvent): void {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.updateQueryParams();
    }

    public aggrChange(event/* ?: AggregationsSelection */): void {
        this.aggrsSelection = event;
        this.updateQueryParams();
    }

    public queryChange(event?: string): void {
        this.query = event;
        this.updateQueryParams();
    }

    private updateQueryParams(): void {
        this.loading = true;

        let queryParams: Params = {};

        queryParams["size"] = this.pageSize.toString(10);

        queryParams["page"] = this.pageIndex.toString(10);

        queryParams["q"] = this.query;

        for (const aggrKey in this.aggrsSelection)  /* this.queryParamKey.aggrsSel */ {
            this.aggrsSelection[aggrKey].forEach((bucketKey) => {
                queryParams[aggrKey] = bucketKey;
            });
        }

        this.navigationExtras = {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: "",
        };

        this.router.navigate(["."], this.navigationExtras);
    }

    //TODO: What does this code do?
    @HostListener('window:resize', ['$event'])
    public onResize(event: Event): void {
        // console.log("window:resize", window.innerWidth);
        if (window.innerWidth <= 740) {
            this.drawer.opened = false;
        }
        else {
            this.drawer.opened = true;
        }
    }
}
