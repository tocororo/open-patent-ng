import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Patent } from 'src/app/interfaces/patent.entity';
import { MessageHandler, StatusCode } from 'toco-lib';
import { PatentService } from '../../services/patent.service';
import { Register } from 'src/app/interfaces/register.interface';
import { formatDate } from '@angular/common';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';

@Component({
  selector: 'app-import-patents',
  templateUrl: './import-patents.component.html',
  styleUrls: ['./import-patents.component.scss']
})
export class ImportPatentsComponent {

  patents: any;
  register: Register = {
    id: '',
    user: '',
    date: undefined
  }
  affiliations: string[] = [];
  authors     : string[] = [];


  file: File[] = [];
  table = false;
  dataSource = new MatTableDataSource<Patent>([]);
  formData = new FormData();
  m = new MessageHandler(this._snackBar);

  requiredCSVKyes = [
    "identifiers",
    "title",
    "assignee",
    "author",
    "priority date",
    "filing/creation date",
    "publication date",
    "grant date",
    "result link",
    "representative figure link"
  ];

  constructor(
    private patentService: PatentService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}



  onSelect(event: any) {
    // const file = [...event.addedFiles];
    this.file.push(...event.addedFiles);
  }

  showData() {
    if (this.file.length === 0) {
      this.m.showMessage(StatusCode.OK, "No hay archivo para mostrar");
    } else {
      this.readFile(this.file[0]).then((fileContents: string) => {
        if (this.file[0].type !== "application/json") {
          const jsonFile = this.csvJson(fileContents);
          this.patents = jsonFile;
          // const p = this.patents.slice(0,20)
          const p = this.getAffiliations(this.patents)
          console.log(p);
        } else {
          this.patents = JSON.parse(fileContents);
        }
        this.table = true;
        this.dataSource.data =
          this.patents.length > 800 ? this.patents.slice(0, 800) : this.patents;
          console.log("🚀 ~ file: import-patents.component.ts:130 ~ this.readFile ~ this.dataSource.data", this.dataSource.data)
      });
    }
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = (e) => {
        // console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        // console.error("No file to read.");
        return reject(null);
      }

      reader.readAsText(file);
    });
  }

  onRemove(event: any) {
    console.log(event);
    this.file.splice(this.file.indexOf(event), 1);
    this.patents = [];
    this.table = false;
  }

  csvJson(text, quoteChar = '"', delimiter = ',') {
    let rows = text.split("\n");
    let headers = rows[0].split(",");

    const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs');

    const match = line => [...line.matchAll(regex)]
      .map(m => m[2])
      .slice(0, -1);

    let lines = text.split('\n');
    const heads = headers ?? match(lines.shift());
    lines = lines.slice(1);

    return lines.map(line => {
      return match(line).reduce((acc, cur, i) => {
        // replace blank matches with `null`
        const val = cur.length <= 0 ? null : Number(cur) || cur;
        const key = heads[i] ?? `{i}`;
        return { ...acc, [key]: val };
      }, {});
    });
  }

  noEsNuloNiIndefinido(elemento){
    return elemento !== null && elemento !== undefined;
  }

  getAffiliations(patents){
    try {
      for (let index = 0; index < patents.length; index++) {
        if (patents[index].assignee != undefined && patents[index].author!= undefined ) {
          const affiliations = patents[index].assignee;
          const authors = patents[index].author;
          this.affiliations = affiliations.split(",");
          this.authors = authors.split(",");
          patents[index].assignee = this.affiliations;
          patents[index].author = this.authors;
        }
        else if(patents[index].assignee == undefined &&  patents[index].author != undefined){
          console.log('undefined affiliations');
          patents[index].assignee = [];
          const authors = patents[index].author;
          this.authors = authors.split(",");
          patents[index].author = this.authors;
        }
        else if(patents[index].assignee != undefined &&  patents[index].author == undefined){
          console.log('undefined authors');
          const affiliations = patents[index].assignee;
          this.affiliations = affiliations.split(",");
          patents[index].assignee = this.affiliations;
          patents[index].author = [];
        }
        else {
          console.log('undefined');

          patents[index].author = [];
          patents[index].assignee = [];
        }
      }
      return patents
    } catch (error) {
      console.log(error.message);
    }

  }



  saveData() {
    this.register.date = formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
    console.log(this.register.date);
    // if (this.file.length === 0) {
    //   this.m.showMessage(StatusCode.OK, "No hay archivo para guardar");
    // } else {
    //   this.formData = this.patents
    //   console.log(this.formData);

    //   this.patentService
    //     .importPatents(this.formData)
    //     .subscribe((response) => {
    //       console.log(response);
    //       // this.formData.delete("peopleFile");
    //     });
    // }
  }

}
