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

@Component({
  selector: 'app-solicitar-patente',
  templateUrl: './solicitar-patente.component.html',
  styleUrls: ['./solicitar-patente.component.scss']
})
export class SolicitarPatenteComponent implements OnInit{

  display       : FormControl = new FormControl("", Validators.required);
  displayR      : FormControl = new FormControl("", Validators.required);
  displayDrawing: FormControl = new FormControl("");
  file_store: FileList;
  file_list : FileList;
  m = new MessageHandler(this._snackBar);

  openPatentFormGroup: FormGroup = this._formBuilder.group({
    title          : ['', Validators.required],
    author         : [''],
    affiliations   : ['', Validators.required],
    reivindicaciones: [''],
    display        : [this.display, Validators.required],
    displayR       : [this.displayR, Validators.required],
    displayDrawing : [this.displayDrawing],
    summary        : ['', Validators.required],

  });



  constructor(private _formBuilder: FormBuilder,
              private patentService: PatentService,
              private _snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit(){
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.patentService.getPatentById(id)))
        .subscribe((patent) => {
        });
    }
  }

  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }
  }

  handleFileInputChange1(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.displayDrawing.patchValue(`${f.name}${count}`);
    } else {
      this.displayDrawing.patchValue("");
    }
  }

  handleFileInputChangeR(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.displayR.patchValue(`${f.name}${count}`);
    } else {
      this.displayR.patchValue("");
    }
  }


  enviarFormulario(){
    console.log('Enviar formulario');
    console.log(this.openPatentFormGroup.value);
    console.log(this.openPatentFormGroup.valid);

    if(this.openPatentFormGroup.valid){
      this.patentService.createPatents(this.openPatentFormGroup).subscribe(dta => {
        console.log('ok');

      })
    }
    else{
      this.m.showMessage(StatusCode.OK, "Por favor rellene todos los campos");
    }
  }


}



