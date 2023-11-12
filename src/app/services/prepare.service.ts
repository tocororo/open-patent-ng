import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrepareService {



  constructor() { }



  // getAffiliations(patents){
  //   try {
  //     for (let index = 0; index < patents.length; index++) {
  //       // this.identifier.value = patents[index].id;
  //       // this.identifiers.push(this.identifier);
  //       // patents[index].id = this.identifiers;
  //       if (patents[index].assignee != undefined && patents[index].author!= undefined ) {
  //         const affiliations = patents[index].assignee.split(",");
  //         const authors = patents[index].author.split(",");
  //         for (let i = 0; i < affiliations.length; i++) {
  //           this.affiliation.name = affiliations[i];
  //           this.affiliations.push(this.affiliation);
  //         }
  //         patents[index].assignee = this.affiliations;
  //         this.affiliations = [];

  //         for (let i = 0; i < authors.length; i++) {
  //           this.author.name = authors[i];
  //           this.authors.push(this.author);
  //         }
  //         patents[index].author = this.authors;
  //         this.authors = [];
  //       }
  //       else if(patents[index].assignee == undefined &&  patents[index].author != undefined){
  //         patents[index].assignee = [];
  //         const authors = patents[index].author.split(",");
  //         for (let i = 0; i < authors.length; i++) {
  //           this.author.name = authors[i];
  //           this.authors.push(this.author);
  //         }
  //         patents[index].author = this.authors;
  //         this.authors = [];
  //       }
  //       else if(patents[index].assignee != undefined &&  patents[index].author == undefined){
  //         const affiliations = patents[index].assignee.split(",");
  //         for (let i = 0; i < affiliations.length; i++) {
  //           this.affiliation.name = affiliations[i];
  //           this.affiliations.push(this.affiliation);
  //         }
  //         patents[index].assignee = this.affiliations;
  //         this.affiliations = [];
  //         patents[index].author = [];
  //       }
  //       else {
  //         patents[index].author = [];
  //         patents[index].assignee = [];
  //       }
  //     }
  //     return patents
  //   } catch (error) {
  //     console.log(error.message);
  //   }

  // }
}
