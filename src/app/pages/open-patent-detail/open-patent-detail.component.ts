import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PatentService } from '../../services/patent.service';
import { Patent } from '../../interfaces/patent.entity';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerModalComponent } from './pdf-viewer-modal/pdf-viewer-modal.component';
import { Hit, Links, StatusCode } from 'toco-lib';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-open-patent-detail',
  templateUrl: './open-patent-detail.component.html',
  styleUrls: ['./open-patent-detail.component.scss']
})
export class OpenPatentDetailComponent implements OnInit{

  @ViewChild('content') popupview !: ElementRef;


  patent!: Hit<Patent>
  displayedColumns: string[] = ['type', 'value'];
  dataSource = new MatTableDataSource<any>();

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
        switchMap( ( {id} ) =>  this.patentService.getPatentById(id)))
      .subscribe( patent =>  {
        console.log(patent);
        this.patent = patent;
        this.dataSource.data = this.patent.metadata.identifiers;
      }, err => {
        Swal.fire({
          html: `<h2>La patente que usted intenta visualizar no existe</h2>`,
          width: 400,
          showConfirmButton: false,
          timer: 1500,
          allowEscapeKey: true,
          icon: "error"
        });
        this.router.navigate(['/']);
      });
  }


  showPdf(){
    const dialog = this.dialog.open(PdfViewerModalComponent, {
      width: '900px',
      panelClass: 'trend-dialog',
      data: { ...this.patent },
    });
  }


}
