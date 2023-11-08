import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {StepperOrientation} from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IdentifierSchemas, MessageHandler, StatusCode } from 'toco-lib';
import { Patent } from '../../interfaces/patent.entity';
import { PatentService } from '../../services/patent.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from 'src/app/components/add-modal/add-modal.component';

@Component({
  selector: 'app-solicitar-patente',
  templateUrl: './solicitar-patente.component.html',
  styleUrls: ['./solicitar-patente.component.scss']
})
export class SolicitarPatenteComponent implements OnInit{

  id: string = '';

  prior     : FormControl = new FormControl("");
  claims    : FormControl = new FormControl("");
  drawing   : FormControl = new FormControl("");
  value     : FormControl = new FormControl("", Validators.required);
  name     : FormControl = new FormControl("", Validators.required);

  // author: FormGroup = this._formBuilder.group({
  //   identifiers  : ['', Validators.required],
  //   name        : ['', Validators.required]
  // });

  // affiliation: FormGroup = this._formBuilder.group({
  //   identifiers: ['', Validators.required],
  //   name       : ['', Validators.required]
  // });

  identifier: FormGroup = this._formBuilder.group({
    idtype: [''],
    value : ['', Validators.required]
  });

  country: FormGroup = this._formBuilder.group({
    code: [''],
    name: [this.name.value]
  });

  file_store: FileList;
  file_list : FileList;
  m = new MessageHandler(this._snackBar);

  public patent: Patent;
  authors: any[] = [];
  affiliations: any[] = [];
  identifiers: any[] = [];


  firstFormGroup = this._formBuilder.group({
    identifier  : [[this.identifiers]],
    title       : ['', Validators.required],
    country     : [this.country.value],
    language    : [''],
    summary     : ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    link          : [''],
    classification: [''],
    authors       : [[this.authors]],
    affiliations  : [[this.affiliations]],
    prior         : [this.prior],
    claims        : [this.claims],
  });


  patentFormGroup: FormGroup = this._formBuilder.group({
    link          : [this.secondFormGroup.value.link],
    classification: [this.secondFormGroup.value.classification],
    authors       : [this.secondFormGroup.value.authors],
    affiliations  : [this.secondFormGroup.value.affiliations, Validators.required],
  });

  constructor(private _formBuilder: FormBuilder,
              private patentService: PatentService,
              private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,) {
  }

  ngOnInit(){
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.patentService.getPatentById(id)))
        .subscribe((data) => {
          console.log(data.metadata.title);
          this.id = data.metadata.id;
          // this.identifier.value.value = data.metadata.identifiers[0].value;
          // console.log(this.identifier.value.value);
          // this.firstFormGroup.value.title = data.metadata.title;
          // this.firstFormGroup.value.language = data.metadata.language;
          // this.firstFormGroup.value.summary = data.metadata.summary;
          // console.log(this.patentFormGroup.value);
          this.identifiers = data.metadata.identifiers;
          this.firstFormGroup.patchValue({
            identifier: this.identifiers,
            title: data.metadata.title,
            country: data.metadata.country,
            language: data.metadata.language,
            summary: data.metadata.summary
          })
          this.patentFormGroup.patchValue({

          })
          console.log(this.patentFormGroup.value);

          // this.patentFormGroup.value.title = patent.title;
          // this.patentFormGroup.value.author = patent.authors;
        });
    }
  }

  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.prior.patchValue(`${f.name}${count}`);
    } else {
      this.prior.patchValue("");
    }
  }

  handleFileInputChange1(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.drawing.patchValue(`${f.name}${count}`);
    } else {
      this.drawing.patchValue("");
    }
  }

  handleFileInputChangeR(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.claims.patchValue(`${f.name}${count}`);
    } else {
      this.claims.patchValue("");
    }
  }

  addIdentifier(){
    this.identifier.value.value = this.value.value;
    console.log(this.identifier.value.value);
    this.identifiers.push(this.identifier.value);
    console.log(this.identifiers);
  }

  saveFirstForm(){
    this.country.value.name = this.name.value;
    this.patentFormGroup.value.identifiers = this.firstFormGroup.value.identifier;
    this.patentFormGroup.value.title = this.firstFormGroup.value.title;
    this.patentFormGroup.value.country = this.firstFormGroup.value.country;
    // this.patentFormGroup.value.drawing = this.firstFormGroup.value.drawing;
    this.patentFormGroup.value.language = this.firstFormGroup.value.language;
    this.patentFormGroup.value.summary = this.firstFormGroup.value.summary;
    console.log(this.patentFormGroup.value);

  }

  enviarFormulario(){
    // this.affiliation.value.identifiers = this.ide
    if (this.id) {
      this.patentService.editPatents(this.patentFormGroup, this.id).subscribe(dta => {
        console.log('ok');
      })
    }
    else{
      this.patentService.createPatents(this.patentFormGroup.value).subscribe(dta =>{
        console.log('data',dta);
      })
    }
    // if(this.patent.id){

    // }else if(this.patentFormGroup.valid){
    //   this.patentService.createPatents(this.patentFormGroup).subscribe(dta => {
    //     console.log('ok');
    // })}
    // else{
    //   this.m.showMessage(StatusCode.OK, "Por favor rellene todos los campos");
    // }
  }

  openModal(event?){
    const dialog = this.dialog.open(AddModalComponent, {
      width: '500px',
    });

    dialog.afterClosed().subscribe((result) => {
      if (result && event) {
        // this.affiliation = result;
        this.affiliations.push(result.value);
        this.patentFormGroup.value.affiliations = this.affiliations;
        console.log(this.patentFormGroup.value);
      }
      else{
        // this.author = result;
        this.authors.push(result.value);
        this.patentFormGroup.value.authors = this.authors;
        console.log(this.patentFormGroup.value);
      }
    });

  }
}



