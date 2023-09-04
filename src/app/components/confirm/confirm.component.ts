import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OpenPatent } from '../../interfaces/open-patent.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  constructor(private dialagRef: MatDialogRef<ConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OpenPatent) {

}
  borrar() {
    this.dialagRef.close(true);
  }

  cerrar() {
    this.dialagRef.close();
  }
}
