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

  prior          : FormControl = new FormControl("");
  claims         : FormControl = new FormControl("");
  drawing        : FormControl = new FormControl("");
  value          : FormControl = new FormControl("", Validators.required);
  name           : FormControl = new FormControl("", Validators.required);
  nameAffiliation: FormControl = new FormControl("", Validators.required);
  edit: boolean = false;

  identifiers: any[] = [];

  author: FormGroup = this._formBuilder.group({
    identifiers: [this.identifiers, Validators.required],
    nameAuthor : ['', Validators.required]
  });

  affiliation: FormGroup = this._formBuilder.group({
    identifiers: [this.identifiers, Validators.required],
    nameAffiliation: ['', Validators.required]
  });

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

  // public patent: Patent;
  authors: any[] = [];
  affiliations: any[] = [];


  firstFormGroup = this._formBuilder.group({
    identifier  : [this.identifiers],
    title       : ['', Validators.required],
    country     : [this.country.value],
    language    : [''],
    summary     : ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    link          : [''],
    classification: [''],
    prior         : [this.prior],
    claims        : [this.claims],
  });

  thirdFormGroup = this._formBuilder.group({
    authors       : [this.authors],
    affiliations  : [this.affiliations],
  });


  patentFormGroup: FormGroup = this._formBuilder.group({
    authors       : [this.thirdFormGroup.value.authors],
    affiliations  : [this.thirdFormGroup.value.affiliations],
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
          /*Rellenando todos los campos del formulario con los valores enviados de la
          patente creada previamente para editar*/
          this.id = data.metadata.id;
          this.identifiers = data.metadata.identifiers;
          this.country.value.name = data.metadata.country.name;
          this.name.patchValue(data.metadata.country.name)
          this.edit = true;
          this.firstFormGroup.patchValue({
            title: data.metadata.title,
            country: data.metadata.country,
            language: data.metadata.language,
            summary: data.metadata.summary
          })
          this.secondFormGroup.patchValue({
            link: data.metadata.link,
            classification: data.metadata.classification
          })
          // for (let index = 0; index < data.metadata.affiliations.length; index++) {
          //   this.affiliation.patchValue({
          //     identifiers: data.metadata.affiliations[index].identifiers,
          //     nameAffiliation: data.metadata.affiliations[index].name,
          //   })}

          //   for (let index = 0; index < data.metadata.authors.length; index++) {
          //     this.author.patchValue({
          //       identifiers: data.metadata.authors[index].identifiers,
          //       nameAuthor: data.metadata.authors[index].name,
          //     })}
          this.authors = data.metadata.authors;
          this.affiliations = data.metadata.affiliations;
          this.patentFormGroup.patchValue({
            authors: this.authors,
            affiliations: this.affiliations
          })
          console.log('patentFormGroup',this.patentFormGroup.value);
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
    this.identifiers.push(this.identifier.value);
    this.value.patchValue('')
    this.identifier.patchValue({
      idtype: '',
      value: ''
    })
    console.log(this.identifiers);
  }

  saveFirstForm(){
    this.country.value.name = this.name.value;
    this.patentFormGroup.value.identifiers = this.identifiers;
    this.patentFormGroup.value.title = this.firstFormGroup.value.title;
    this.patentFormGroup.value.country = this.firstFormGroup.value.country;
    this.patentFormGroup.value.language = this.firstFormGroup.value.language;
    this.patentFormGroup.value.summary = this.firstFormGroup.value.summary;
    console.log('p', this.patentFormGroup.value);

  }

  saveSecondForm(){
    this.patentFormGroup.value.link = this.secondFormGroup.value.link;
    this.patentFormGroup.value.classification = this.secondFormGroup.value.classification;
    console.log('p', this.patentFormGroup.value);

  }

  addAffiliation(){
    this.affiliations.push(this.affiliation.value);
    this.patentFormGroup.value.affiliations = this.affiliations;
    this.identifiers = [];
    console.log(this.patentFormGroup.value.affiliations);
    this.affiliation.patchValue({
      identifiers: [this.identifiers],
      nameAuthor: ['']
    })
  }

  addAuthor(){
    this.authors.push(this.author.value);
    this.patentFormGroup.value.authors = this.authors;
    this.identifiers = [];
    console.log(this.patentFormGroup.value.authors);
    this.author.patchValue({
      identifiers: [this.identifiers],
      nameAuthor: ['']
    })

  }

  enviarFormulario(){
    if (this.id) {
      this.patentService.editPatents(this.patentFormGroup.value, this.id).subscribe(dta => {
        try {
          this.m.showMessage(StatusCode.OK, "Patente editada exitosamente");
          this.router.navigate(['/']);
        } catch (error) {
          console.log(error);
        }
      })
    }
    else{
      this.patentService.createPatents(this.patentFormGroup.value).subscribe(dta =>{
        try {
          this.m.showMessage(StatusCode.OK, "Patente creada exitosamente");
          this.router.navigate(['/']);

        } catch (error) {
          console.log(error);
        }
      })
    }
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



