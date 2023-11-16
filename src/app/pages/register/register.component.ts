import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PatentService } from '../../services/patent.service';
import { Register } from '../../interfaces/register.interface';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  displayedColumns: string[] = ['autor', 'fecha', 'cantidad', 'delete'];
  dataSource = new MatTableDataSource<any>();
  register: Register[] = [];

  private paginator: MatPaginator;
  date: string = ""
  data: any

  @ViewChild(MatPaginator) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private patentService: PatentService){}

  ngOnInit(){
    this.patentService.getRegister().subscribe(data => {
      // this.register = register;
      this.data = data.data.register.data
      for (let i = 0; i < this.data.length; i++) {
        let f = this.data[i].date;
        this.data[i].date = f.split("T")
        this.data[i].date.pop()
        this.data[i].date = this.data[i].date.toString();
        this.register.push(this.data[i])
      }
      // this.register = this.data;
      console.log(this.register);
      this.dataSource.data = this.register;
    })
  }

  eliminar(id){
    this.patentService.deleteRegister(id).subscribe(rta => {
        this.register = this.register.filter(register =>
          register.id != id
        );
        this.dataSource.data = this.register;
      console.log(rta);
    })
  }
}
