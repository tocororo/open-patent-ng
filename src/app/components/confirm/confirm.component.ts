import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patent } from '../../interfaces/patent.entity';
import { Hit } from 'toco-lib';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  constructor(private dialagRef: MatDialogRef<ConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Hit<Patent>) {

}

ngOnInit(){
}

  borrar() {
    this.dialagRef.close(true);
  }

  cerrar() {
    this.dialagRef.close();
  }
}
