import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { OpenPatent } from 'src/app/interfaces/open-patent.interface';
import { MessageHandler, StatusCode } from 'toco-lib';

@Component({
  selector: 'app-import-patents',
  templateUrl: './import-patents.component.html',
  styleUrls: ['./import-patents.component.scss']
})
export class ImportPatentsComponent {

  patents: any[] = [];

  file: File[] = [];
  dataSource = new MatTableDataSource<any>([]);
  m = new MessageHandler(this._snackBar);

  requiredJSONKyes = [
    "_id",
    "identifiers",
    "name",
    "lastName",
    "gender",
    "country",
    "institutional_email",
    "emails",
  ];

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}



  onSelect(event: any) {
    // const file = [...event.addedFiles];
    this.file.push(...event.addedFiles);

    this.readFile(this.file[0]).then((fileContents: string) => {

      if (this.file[0].type !== "application/json") {
        const jsonFile = this.csvToJson(fileContents);
        this.patents = JSON.parse(jsonFile);



      } else {
        this.patents = JSON.parse(fileContents);
      }
    });
  }

  showData() {
    if (this.file.length === 0) {
      this.m.showMessage(StatusCode.OK, "No hay archivo para mostrar");
    } else {
      this.readFile(this.file[0]).then((fileContents: string) => {
        if (this.file[0].type !== "application/json") {
          const jsonFile = this.csvToJson(fileContents);
          this.patents = JSON.parse(jsonFile);
        } else {
          this.patents = JSON.parse(fileContents);

        }
        // const eliminado = this.people.shift();
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
  }

  csvToJson(csv: any) {
    let lines = csv.split("\n");
    let result = [];
    let headers = lines[0].split(",");
    for (let i = 0; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
      result.push(obj);
    }
    return JSON.stringify(result);
  }

  // saveData() {
  //   if (this.file.length === 0) {
  //     this.m.showMessage(StatusCode.OK, "No hay archivo para guardar");
  //   } else {
  //     this.peopleService
  //       .saveImport(this.org.id, this.file[0])
  //       .subscribe((response) => {
  //         console.log(response);
  //         // this.formData.delete("peopleFile");
  //       });
  //   }
  // }

}
