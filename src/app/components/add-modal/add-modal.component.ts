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

  constructor(private dialagRef: MatDialogRef<AddModalComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(){
    console.log(this.data.identifiers);
    if(this.data.identifiers){
      // this.result.value.identifiers = this.data.identifiers
      this.identifiers = this.data.identifiers;
      this.result.patchValue({
        identifiers: [this.identifiers],
        name: this.data.name
      })
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


  agregar() {
    this.dialagRef.close(this.result);
  }

  cerrar() {
    this.dialagRef.close();
  }

}
