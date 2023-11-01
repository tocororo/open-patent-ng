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

  prior     : FormControl = new FormControl("", Validators.required);
  claims    : FormControl = new FormControl("", Validators.required);
  drawing   : FormControl = new FormControl("");
  author: FormGroup = this._formBuilder.group({
    identifier  : ['', Validators.required],
    name        : ['', Validators.required]
  });

  affiliation: FormGroup = this._formBuilder.group({
    identifier  : ['', Validators.required],
    name        : ['', Validators.required]
  });

  file_store: FileList;
  file_list : FileList;
  m = new MessageHandler(this._snackBar);

  authors: any[] = [];
  affiliations: any[] = [];


  firstFormGroup = this._formBuilder.group({
    identifier  : ['', Validators.required],
    title       : ['', Validators.required],
    country     : [''],
    drawing     : [this.drawing],
    language    : [''],
    summary     : ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    author      : [this.author.value],
    affiliations: [this.affiliation.value, Validators.required],
    prior       : [this.prior, Validators.required],
    claims      : [this.claims, Validators.required],
  });


  patentFormGroup: FormGroup = this._formBuilder.group({
    identifier  : [this.firstFormGroup.value.identifier, Validators.required],
    title       : [this.firstFormGroup.value.title, Validators.required],
    country     : [this.firstFormGroup.value.country],
    drawing     : [this.firstFormGroup.value.drawing],
    language    : [this.firstFormGroup.value.language],
    summary     : [this.firstFormGroup.value.summary, Validators.required],
    author      : [this.secondFormGroup.value.author],
    affiliations: [this.secondFormGroup.value.affiliations, Validators.required],
    prior       : [this.secondFormGroup.value.prior, Validators.required],
    claims      : [this.secondFormGroup.value.claims, Validators.required],
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
        .subscribe((patent) => {
          // this.patent.push(patent);
          this.patentFormGroup.value.identifier = patent.identifiers;
          this.patentFormGroup.value.title = patent.title;
          this.patentFormGroup.value.author = patent.authors;
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


  enviarFormulario(){
    console.log('Enviar formulario');
    console.log(this.patentFormGroup.value);
    console.log(this.patentFormGroup.valid);

    // if(this.patent.id){
    //   this.patentService.editPatents(this.patentFormGroup, this.patent.id).subscribe(dta => {
    //     console.log('ok');
    //   })
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
        this.affiliation = result;
        this.affiliations.push(this.affiliation.value);
        this.patentFormGroup.value.affiliations = this.affiliations;
        console.log(this.patentFormGroup.value);
      }
      else{
        this.author = result;
        this.authors.push(this.author.value);
        this.patentFormGroup.value.author = this.authors;
        console.log(this.patentFormGroup.value);
      }
    });

  }
}



