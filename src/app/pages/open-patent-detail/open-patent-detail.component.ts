import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PatentService } from '../../services/patent.service';
import { Patent } from '../../interfaces/patent.entity';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewerModalComponent } from './pdf-viewer-modal/pdf-viewer-modal.component';
import { Hit, Links } from 'toco-lib';
import { MatTableDataSource } from '@angular/material/table';


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
        switchMap( ( {id} ) =>  this.patentService.getPatentById(id))
      )
      .subscribe( patent =>  {
        console.log(patent);
        this.patent = patent;
        this.dataSource.data = this.patent.metadata.identifiers;
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
