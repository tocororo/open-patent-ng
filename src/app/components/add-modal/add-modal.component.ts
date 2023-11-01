import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent {

  result: FormGroup = this._formBuilder.group({
    identifier  : ['', Validators.required],
    name        : ['', Validators.required]
  });

  affiliation: FormGroup = this._formBuilder.group({
    identifier  : ['', Validators.required],
    name        : ['', Validators.required]
  });


  constructor(private dialagRef: MatDialogRef<AddModalComponent>,
              private _formBuilder: FormBuilder,) {}

  ngOnInit(){
  }

  agregar() {
    this.dialagRef.close(this.result);
  }

  cerrar() {
    this.dialagRef.close();
  }

}
