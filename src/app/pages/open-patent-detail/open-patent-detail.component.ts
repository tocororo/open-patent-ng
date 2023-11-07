import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PatentService } from '../../services/patent.service';
import { Patent } from '../../interfaces/patent.entity';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerModalComponent } from './pdf-viewer-modal/pdf-viewer-modal.component';


@Component({
  selector: 'app-open-patent-detail',
  templateUrl: './open-patent-detail.component.html',
  styleUrls: ['./open-patent-detail.component.scss']
})
export class OpenPatentDetailComponent implements OnInit{

  @ViewChild('content') popupview !: ElementRef;

  patent!: Patent;

  patent1: any = {
    title: 'Iphone XS',
    authors: ['Steve Jobs'],
    affiliations: ["Samsung", "Xiaomi"],
    summary: 'Nuevo Iphone lanzado al mercado',
    id: ''
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
    this.activatedRoute.params
      .pipe(
        switchMap( ( {id} ) =>  this.patentService.getPatentById(id))
      )
      .subscribe( patent =>  {
        // this.patent = patent;
        console.log(patent);

      });
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
