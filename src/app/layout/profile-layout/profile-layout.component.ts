import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit{

  // public person: Person;

  constructor(
    private _activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    // console.log(this.route.root);

		// let uuid = this.route.snapshot.paramMap.get('uuid');
    // this.service.getPeopleById(uuid).subscribe(
    //   (data) => {
    //     console.log(data);

    //       this.person = data.person.metadata;
    //   }
    // );

    this._activatedRoute.data.subscribe(
      (data) => {
        console.log(data);

          // this.person = data.person.metadata;
      }
    );
  }

}
