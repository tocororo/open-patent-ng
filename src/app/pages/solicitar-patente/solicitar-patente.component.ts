import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {StepperOrientation} from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { IdentifierSchemas, MessageHandler, StatusCode } from 'toco-lib';
import { Patent } from '../../interfaces/patent.entity';
import { PatentService } from '../../services/patent.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from 'src/app/components/add-modal/add-modal.component';
import { allowedURLS } from '../../../environments/environment.prod';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'
import { error } from 'console';

@Component({
  selector: 'app-solicitar-patente',
  templateUrl: './solicitar-patente.component.html',
  styleUrls: ['./solicitar-patente.component.scss']
})
export class SolicitarPatenteComponent implements OnInit{

  id: string = '';
  type: string = 'affiliation';
  validar: boolean = false;
  disabled: boolean = false;

  prior          : FormControl = new FormControl("");
  claims         : FormControl = new FormControl("");
  drawing        : FormControl = new FormControl("");
  value          : FormControl = new FormControl("", Validators.required);
  name           : FormControl = new FormControl("");
  nameAffiliation: FormControl = new FormControl("", Validators.required);
  edit: boolean = false;

  identifiers: any[] = [];

  identifier: FormGroup = this._formBuilder.group({
    idtype: ['doi'],
    value : ['', Validators.required]
  });

  country: FormGroup = this._formBuilder.group({
    code: [''],
    name: [this.name.value]
  });

  file_store: FileList;
  file_list : FileList;
  m = new MessageHandler(this._snackBar);

  // public patent: Patent;
  authors: any[] = [];
  affiliations: any[] = [];


  firstFormGroup = this._formBuilder.group({
    identifier  : this.identifiers,
    title       : ['', Validators.required],
    country     : [this.country.value],
    language    : [''],
    summary     : [''],
  });

  secondFormGroup = this._formBuilder.group({
    link          : [''],
    classification: [''],
    prior         : [this.prior],
    claims        : [this.claims],
    authors       : [this.authors],
    affiliations  : [this.affiliations],
  });


  patentFormGroup: FormGroup = this._formBuilder.group({
    link          : [this.secondFormGroup.value.link],
    classification: [this.secondFormGroup.value.classification],
    authors       : [this.secondFormGroup.value.authors],
    affiliations  : [this.secondFormGroup.value.affiliations],
  });

  constructor(private _formBuilder: FormBuilder,
              private patentService: PatentService,
              private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private _location: Location) {
  }

  ngOnInit(){
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.patentService.getPatentById(id)))
        .subscribe((data) => {
            /*Rellenando todos los campos del formulario con los valores enviados de la
            patente creada previamente para editar*/
            console.log('DATA',data);

            this.edit = true;
            this.value.disable();
            this.id = data.metadata.id;
            this.identifiers = data.metadata.identifiers;
            console.log('IDENTIFIERS',this.identifiers);

            this.value.patchValue(data.metadata.identifiers[0].value)
            console.log('VALUE',this.value.value);

            if (data.metadata.country) {
              this.country.value.name = data.metadata.country.name;
              this.name.patchValue(data.metadata.country.name)
            }
            this.firstFormGroup.patchValue({
              identifier: this.identifiers,
              title: data.metadata.title,
              country: data.metadata.country,
              language: data.metadata.language,
              summary: data.metadata.summary
            })
            console.log(this.firstFormGroup.value.title);
            this.secondFormGroup.patchValue({
              link: data.metadata.link,
              classification: data.metadata.classification
            })
            // this.identifiers= [];
            this.authors = data.metadata.authors;
            this.affiliations = data.metadata.affiliations;

            this.patentFormGroup.patchValue({
              link: data.metadata.link,
              classification: data.metadata.classification,
              authors: this.authors,
              affiliations: this.affiliations
            })
            console.log('patentFormGroup',this.patentFormGroup.value);
          }, err => {
            Swal.fire({
              html: `<h2>La patente que usted intenta editar no existe</h2>`,
              width: 400,
              showConfirmButton: false,
              timer: 1500,
              allowEscapeKey: true,
              icon: "error"
            });
            this.router.navigate(['/']);
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

  saveFirstForm(){
      if (this.firstFormGroup.value.title != '' && this.value.value != '') {
        this.country.value.name = this.name.value;
        if (!this.edit) {
          this.identifier.value.value = this.value.value;
          this.identifiers.push(this.identifier.value);
        }
        this.firstFormGroup.value.country = this.country.value;
        this.patentFormGroup.value.identifiers = this.identifiers;
        this.patentFormGroup.value.title = this.firstFormGroup.value.title;
        this.patentFormGroup.value.country = this.firstFormGroup.value.country;
        this.patentFormGroup.value.language = this.firstFormGroup.value.language;
        this.patentFormGroup.value.summary = this.firstFormGroup.value.summary;
        console.log('p', this.patentFormGroup.value);
      }

  }

  enviarFormulario(){
    this.patentFormGroup.value.classification = this.secondFormGroup.value.classification;
    this.patentFormGroup.value.link = this.secondFormGroup.value.link;
    if (this.id) {
      this.patentService.editPatents(this.patentFormGroup.value, this.id).subscribe(dta => {
        try {
          console.log(dta);
          Swal.fire({
            html: `<h2>Patente editada exitosamente</h2>`,
            width: 400,
            showConfirmButton: false,
            timer: 1500,
            allowEscapeKey: true,
            icon: "success"
          });
          // this.m.showMessage(StatusCode.OK, "Patente editada exitosamente");
          this._location.back();
        } catch (error) {
          console.log(error);
        }
      })
    }
    else{
      if (this.patentFormGroup.valid && this.firstFormGroup.valid && this.value.valid) {
        this.patentService.createPatents(this.patentFormGroup.value).subscribe(dta =>{
          console.log(dta);

          try {
            if(dta['ERROR'] == "Patente existente"){
              Swal.fire({
                html: `<h2>La patente que usted intenta crear ya existe</h2>`,
                width: 400,
                showConfirmButton: false,
                timer: 1500,
                allowEscapeKey: true,
                icon: "error"
              });
            }
            else{
              Swal.fire({
                html: `<h2>Patente creada exitosamente</h2>`,
                width: 400,
                showConfirmButton: false,
                timer: 1500,
                allowEscapeKey: true,
                icon: "success"
              });
              this.router.navigate(['/']);
            }
          } catch (error) {
            console.log(error);
          }
        })
      }

      else{
        Swal.fire({
          html: `<h2>Rellene todos los campos requeridos</h2>`,
          width: 400,
          showConfirmButton: false,
          timer: 1500,
          allowEscapeKey: true,
          icon: "error"
        });
        // this.m.showMessage(StatusCode.notFound, "Rellene todos los campos requeridos");
      }

    }
  }

  openModalAu(event?){
    const dialog = this.dialog.open(AddModalComponent, {
      data: {...event},
      width: '500px',
    });

    dialog.afterClosed().subscribe((result?) => {
      if (result && event) {
        for (let i = 0; i < this.authors.length; i++) {
          if (this.authors[i].name === event.name) {
            console.log(result.value);
            this.authors[i] = result.value;
          }
        }
      }
      else if(result){
        this.authors.push(result.value);
        this.patentFormGroup.value.authors = this.authors;
        console.log(this.authors);
      }
      else{}
  });

  }

  openModalAf(event?){
    const dialog = this.dialog.open(AddModalComponent, {
      data: {...event},
      width: '500px',
    });

    dialog.afterClosed().subscribe((result?) => {
        if (result && event) {
          for (let i = 0; i < this.affiliations.length; i++) {
            if (this.affiliations[i].name === event.name) {
              this.affiliations[i] = result.value;
            }
          }
          console.log('af',this.affiliations);
        }
        else if(result){
          this.affiliations.push(result.value);
          this.patentFormGroup.value.affiliations = this.affiliations;
          console.log(this.affiliations);
        }
        else{}
    });

  }
}



