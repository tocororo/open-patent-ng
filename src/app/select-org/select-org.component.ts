/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ParamMap, Params } from "@angular/router";
import {
  ContainerPanelComponent,
  FlatTreeNode,
  HintPosition,
  HintValue,
  Hit,
  InputTextComponent,
  Organization,
  PanelContent,
  SelectOptionNode,
  SelectOrgsComponent,
} from "toco-lib";

export const CatalogFilterKeys = {
  title: "title",
  source_type: "source_type",
  institutions: "organizations",
  subjects: "subjects",
  grupo_mes: "grupo_mes",
  indexes: "indexes",
  // source_status: "source_status"
};
@Component({
  selector: "app-select-org",
  templateUrl: "./select-org.component.html",
  styleUrls: ["./select-org.component.scss"],
})
export class SelectOrgComponent implements OnInit {

  @Output()
  paramsChange: EventEmitter<Params> = new EventEmitter();

  filterPanel: PanelContent = null;
  formGroup: UntypedFormGroup;

  institutionTree: SelectOptionNode[] = [];
  institutionSelection: FlatTreeNode[];

  filters: Map<string, string> = new Map<string, string>();

  selectedOrgs: string = ""

  constructor(private _formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
    this.initPanels();
  }

  private initFilters() {
      this.filters.set(
        CatalogFilterKeys.institutions,
        this.selectedOrgs
      );
  }

  initPanels() {
    this.formGroup = this._formBuilder.group({});
    this.initFilters();
    this.formGroup.valueChanges.subscribe(
      (values) => {
        this.changeTermMultipleFilter(
          values,
          CatalogFilterKeys.institutions,
          "id"
        );
        let res: Params = {};
        this.filters.forEach((value: string, key: string) => {
          if (value != "") {
            res[key] = value;
          }
        });

        this.paramsChange.emit(res);
      },
      (err: any) => {
        console.log("error: " + err + ".");
      },
      () => {
        console.log("complete");
      }
    );

    this.filterPanel = {
      name: "filterPanel",
      label: "",
      description: "",
      iconName: "filter",
      controlType: ContainerPanelComponent,
      formSection: this.formGroup,
      formSectionContent: [
        {
          formControl: InputTextComponent.getFormControlByDefault(),
          name: CatalogFilterKeys.institutions,
          label: "Seleccione una institución para la importación",
          controlType: SelectOrgsComponent,
          startHint: new HintValue(HintPosition.start, ""),
          required: false,
          width: "100%",
          extraContent: {
            multiple: false,
            orgFilter: { type: "country", value: "Cuba" },
            selectedOrgsIds: this.filters.has(CatalogFilterKeys.institutions)
              ? this.filters.get(CatalogFilterKeys.institutions).split(",")
              : [],
          },
        },
      ],
    };
  }

  private changeTermMultipleFilter(values, key, valuekey = "uuid") {
    if (values[key]) {
      let val = "";
      values[key].forEach((element) => {
        console.log(element);

        val = val.concat(element[valuekey], ",");
      });
      val = val.slice(0, val.length - 1);
      // if (val != '') {
      this.filters.set(key, val);
      // this.filters[key] = val;
      // }
    }
  }
}
