import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Patent } from 'src/app/interfaces/patent.entity';
import { MessageHandler, StatusCode } from 'toco-lib';
import { PatentService } from '../../services/patent.service';
import { Register } from 'src/app/interfaces/register.interface';
import { formatDate } from '@angular/common';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { request } from 'http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-import-patents',
  templateUrl: './import-patents.component.html',
  styleUrls: ['./import-patents.component.scss']
})
export class ImportPatentsComponent implements OnInit{

  patents: any;
  register: Register = {
    userEmail: '',
    date: undefined,
    patents: 0
  }

  file: File[] = [];
  table = false;
  dataSource = new MatTableDataSource<Patent>([]);
  m = new MessageHandler(this._snackBar);


  identifier = {
    idtype: "",
    value: ""
  }

  affiliation = {
    identifiers: [],
    name: ""
  }

  author = {
    identifiers: [],
    name: ""
  }

  affiliations: any[] = [];
  authors     : any[] = [];
  identifiers : any[] = [];

  constructor(
    private patentService: PatentService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private oauthStorage: OAuthStorage,
    private _router: Router,
  ) {}

  ngOnInit(){
  }



  onSelect(event: any) {
    // const file = [...event.addedFiles];
    if (this.file.length > 0) {
      Swal.fire({
        html: `<h2>Solo se puede importar un archivo a ala vez</h2>`,
        width: 400,
        showConfirmButton: false,
        timer: 1500,
        allowEscapeKey: true,
        icon: "error"
      });
    }else {
    this.file.push(...event.addedFiles);
    this.readFile(this.file[0]).then((fileContents: string) => {
      let patents = null
      if (this.file[0].type !== "application/json") {
        const jsonFile = this.csvJson(fileContents);
        this.patents = jsonFile;
        this.patents = this.getAffiliations(this.patents);
        this.patents = this.patents.slice(0, 2);
        patents = jsonFile;
        patents.pop();
        this.file[0] = patents;
      } else {
        this.patents = JSON.parse(fileContents);
        // patents = fileContents;
        // this.file[0] = patents;
        // console.log(this.file[0]);

        // this.patents = JSON.parse(fileContents);
      }
    });
  }
  }

  showData() {
    if (this.file.length === 0) {
      Swal.fire({
        html: `<h2>No hay archivo para mostrar</h2>`,
        width: 400,
        showConfirmButton: false,
        timer: 1500,
        allowEscapeKey: true,
        icon: "error"
      });
      // this.m.showMessage(StatusCode.OK, "No hay archivo para mostrar");
    } else {
      // this.patents = this.getAffiliations(this.patents)
      console.log('patents',this.patents);
      if(this.patents.patents != undefined){
        this.patents = this.patents.patents;
      }
      console.log(this.patents);

      this.table = true;
      this.dataSource.data =
        this.patents.length > 800 ? this.patents.slice(0, 800) : this.patents;
        console.log("🚀 ~ file: import-patents.component.ts:130 ~ this.readFile ~ this.dataSource.data", this.dataSource.data)

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

  getAffiliations(patents){
    try {
      for (let index = 0; index < patents.length; index++) {
        if (patents[index].assignee != undefined && patents[index].author!= undefined ) {
          this.affiliations = patents[index].assignee.split(",");
          this.authors = patents[index].author.split(",");
          patents[index].assignee = this.affiliations;
          this.affiliations = [];
          patents[index].author = this.authors;
          this.authors = [];
        }
        else if(patents[index].assignee == undefined &&  patents[index].author != undefined){
          patents[index].assignee = [];
          this.authors = patents[index].author.split(",");
          patents[index].author = this.authors;
          this.authors = [];
        }
        else if(patents[index].assignee != undefined &&  patents[index].author == undefined){
          this.affiliations = patents[index].assignee.split(",");
          patents[index].assignee = this.affiliations;
          this.affiliations = [];
          patents[index].author = [];
        }
        else {
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
    if (this.file.length === 0) {
      Swal.fire({
        html: `<h2>No hay archivo para guardar</h2>`,
        width: 400,
        showConfirmButton: false,
        timer: 1500,
        allowEscapeKey: true,
        icon: "error"
      });
    } else {
      // const file = new File([this.file[0]], 'patentes.json')
      if(this.patents.patents != undefined){
        this.patents = this.patents.patents
      }
      this.patentService
        .importPatents(this.patents)
        .subscribe((response) => {
          this.createRegister();
          console.log(response);
          try {
            if (response['SUCCES']) {
              Swal.fire({
                html: `<h2>Patentes creadas exitosamente</h2>`,
                width: 400,
                showConfirmButton: false,
                timer: 1500,
                allowEscapeKey: true,
                icon: "success"
              });
            }
            else{
              Swal.fire({
                html: `<h2>Ocurrió algún error. Por favor asegúrese que los
                campos sean correctos</h2>`,
                width: 400,
                showConfirmButton: false,
                timer: 1500,
                allowEscapeKey: true,
                icon: "success"
              });
            }
          } catch (error) {
            this.m.showMessage(StatusCode.serverError, "Ocurrio algun error. Asegurese de que los campos del archivo sean correctos.");
          }
        });
    }
  }

  createRegister(){
    let user;
    let request = JSON.parse(this.oauthStorage.getItem("user"));
    if (request) {
      if (request.roles) {
        user = request.email.split('@')[0]
      }
      else{
        user = request.data.userprofile.user;
      }
    }
    let date = new Date();
    this.register = {
      userEmail: user.email.split('@')[0],
      patents: this.patents.length,
      date: date
    }
    console.log(this.register);
    this.patentService.createRegister(this.register).subscribe(rta=> console.log(rta));

  }

}
