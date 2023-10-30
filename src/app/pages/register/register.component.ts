import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PatentService } from '../../services/patent.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  displayedColumns: string[] = ['numero', 'autor', 'fecha'];
  dataSource = new MatTableDataSource<any>();
  register: any = [];

  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private patentService: PatentService){}

  ngOnInit(){
    // this.patentService.getRegister().subscribe(register => {
    //   this.register = register;
    // })
  }
}
