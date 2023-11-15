import { Entity, Identifier, Role } from 'toco-lib';


export class Patent extends Entity{
  title: string;
  authors: Array<any>;
  affiliations: Array<any>;
  classification?: string;
  summary?: string;
  prior_art?: File;
  country?: any;
  language?: string;
  creation_date?: string;
  grant_date?: string;
  publication_date?: string;
  claims?: File;
  drawing?: File;
  link?: string;
}
