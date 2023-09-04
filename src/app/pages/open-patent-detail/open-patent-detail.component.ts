import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PatentService } from '../../services/patent.service';
import { OpenPatent } from '../../interfaces/open-patent.interface';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerModalComponent } from './pdf-viewer-modal/pdf-viewer-modal.component';


@Component({
  selector: 'app-open-patent-detail',
  templateUrl: './open-patent-detail.component.html',
  styleUrls: ['./open-patent-detail.component.scss']
})
export class OpenPatentDetailComponent implements OnInit{

  @ViewChild('content') popupview !: ElementRef;

  patent!: OpenPatent;

  patent1: OpenPatent = {
    title: 'Iphone XS',
    author: 'Steve Jobs',
    organization: 'Apple',
    affiliations: ["Samsung", "Xiaomi"],
    summary: 'Nuevo Iphone lanzado al mercado'
  }

  documents = [
    "Documento1",
    "Documento2",
    "Documento3"
  ]


  constructor(private activatedRoute: ActivatedRoute,
              private patentService: PatentService,
              private router: Router,
              public dialog: MatDialog,) { }

  ngOnInit() {
    // this.activatedRoute.params
    //   .pipe(
    //     switchMap( ( {title} ) =>  this.patentService.getPatentById(title))
    //   )
    //   .subscribe( patent =>  this.patent = patent);
  }

  // PreviewInvoice(invoiceno: any) {
  //   this.invoiceno = invoiceno;
  //   this.patentService.GenerateInvoicePDF(invoiceno).subscribe(res => {
  //     let blob: Blob = res.body as Blob;
  //     let url = window.URL.createObjectURL(blob);
  //     this.pdfUrl = url;
  //     //window.open(url);
  //   });
  // }


  showPdf(){
    const dialog = this.dialog.open(PdfViewerModalComponent, {
      width: '900px',
      panelClass: 'trend-dialog',
      data: { ...this.patent },
    });
  }


}
