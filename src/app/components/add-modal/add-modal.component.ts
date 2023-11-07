import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent {

  value     : FormControl = new FormControl("", Validators.required);
  identifiers: any[] = [];

  result: FormGroup = this._formBuilder.group({
    identifiers : [this.identifiers, Validators.required],
    name        : ['', Validators.required]
  });

  identifier: FormGroup = this._formBuilder.group({
    idtype: [''],
    value : ['', Validators.required]
  });

  // affiliation: FormGroup = this._formBuilder.group({
  //   identifier  : ['', Validators.required],
  //   name        : ['', Validators.required]
  // });


  constructor(private dialagRef: MatDialogRef<AddModalComponent>,
              private _formBuilder: FormBuilder,) {}

  ngOnInit(){
  }

  addIdentifier(){
    this.identifier.value.value = this.value.value;
    this.identifiers.push(this.identifier.value);
    console.log(this.identifiers);
  }


  agregar() {
    this.dialagRef.close(this.result);
  }

  cerrar() {
    this.dialagRef.close();
  }

}
