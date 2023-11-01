import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit{

  // public person: Person;

  constructor(
    private _activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    if (this.router.url.includes('author')){
    // let uuid = this.route.snapshot.paramMap.get('uuid');
    // this.service.getPeopleById(uuid).subscribe(
    //   (data) => {
    //     console.log(data);

    //       this.person = data.person.metadata;
    //   }
    // );
    }
    // console.log(this.route.root);
    this._activatedRoute.data.subscribe(
      (data) => {
        console.log(data);

          // this.person = data.person.metadata;
      }
    );
  }

}
