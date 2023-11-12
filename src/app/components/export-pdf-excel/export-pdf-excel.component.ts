import { Component, Input, OnInit } from '@angular/core';
import { ExportToCsvService } from 'src/app/services/export-to-csv.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-export-pdf-excel',
  templateUrl: './export-pdf-excel.component.html',
  styleUrls: ['./export-pdf-excel.component.scss']
})
export class ExportPdfExcelComponent implements OnInit{

  @Input() inputValue: any = null;
  @Input() pdfType: 'list' | 'single' = 'single';
  @Input() type: 'pdf' | 'excel' | null = null;
  @Input() viewType: 'icon' | 'button' = 'icon';

  metadata = [];
  author = '';
  authors = [];
  affiliations = [];
  affiliation = '';
  identifiers = [];
  identifier = '';



  constructor(private exportToCsvService: ExportToCsvService){}
  ngOnInit(){
  }

  exportarExcel(){
    this.metadata = this.prepare();
    console.log(this.metadata);
    const newBook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(this.metadata);
    XLSX.utils.book_append_sheet(newBook, newSheet, 'Sheet1');
    XLSX.writeFile(newBook, 'new-book.xlsx');
    console.log(newBook);

  }

  prepare(){
    for (let index = 0; index < this.inputValue.length; index++) {
      this.metadata.push(this.inputValue[index].metadata)
    }
    for (let index = 0; index < this.metadata.length; index++) {
      for (let i = 0; i < this.metadata[index].identifiers.length; i++) {
          this.identifiers.push(this.metadata[index].identifiers[i].value)
          this.identifier = this.identifiers.toString();
        }
      this.metadata[index].identifiers = this.identifier
      console.log(this.metadata[index].identifiers);
      this.identifier = '';
      this.identifiers = [];
    }

    for (let index = 0; index < this.metadata.length; index++) {
      if (this.metadata[index].authors.length != 0){
        for (let i = 0; i < this.metadata[index].authors.length; i++) {
          console.log('p',this.metadata[index].authors[i].name);
          this.authors.push(this.metadata[index].authors[i].name)
          this.author = this.authors.toString();
        }
      this.metadata[index].authors = this.author
      console.log(this.metadata[index].authors);
      this.author = ''
      this.authors = []
      }
      else{
        this.metadata[index].authors = ''
      }


    }

    for (let index = 0; index < this.metadata.length; index++) {
      if (this.metadata[index].affiliations.length != 0){
        for (let i = 0; i < this.metadata[index].affiliations.length; i++) {
          console.log('p',this.metadata[index].affiliations[i].name);
          this.affiliations.push(this.metadata[index].affiliations[i].name)
          this.affiliation = this.affiliations.toString();
        }
      this.metadata[index].affiliations = this.affiliation
      console.log(this.metadata[index].affiliations);
      this.affiliation = ''
      this.affiliations = []
      }
      else{
        this.metadata[index].affiliations = ''
      }
    }

    for (let index = 0; index < this.metadata.length; index++) {
      if (this.metadata[index].country != undefined) {
        this.metadata[index].country = this.metadata[index].country.name;
      }
      else{
        this.metadata[index].country = '';
      }
    }
    return this.metadata;
  }



  download(){
    this.metadata = this.prepare()
    this.exportToCsvService.downloadFile(this.metadata, 'jsontocsv');
  }

}
