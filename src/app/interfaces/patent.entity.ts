import { Entity, Role } from 'toco-lib';


export class Patent extends Entity{
  title: string;
  authors: Array<string>;
  affiliations: Array<string>;
  classification?: string;
  summary?: string;
  prior_art?: File;
  country?: string;
  language?: string;
  creation_date?: string;
  grant_date?: string;
  publication_date?: string;
  claims?: File;
  drawing?: File;
  link?: string;
}
