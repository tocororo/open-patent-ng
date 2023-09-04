import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patent } from 'src/app/interfaces/patent.entity';

@Component({
  selector: 'app-pdf-viewer-modal',
  templateUrl: './pdf-viewer-modal.component.html',
  styleUrls: ['./pdf-viewer-modal.component.scss'],
  providers: [
  ],
})
export class PdfViewerModalComponent {

  pdfUrl = '../../../../assets/example.pdf';

  constructor(public dialogRef: MatDialogRef<PdfViewerModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Patent){}


  close(): void {
    this.dialogRef.close();
  }
}
