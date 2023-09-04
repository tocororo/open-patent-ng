import { Entity, Role } from 'toco-lib';


export class Patent{
  id: string;
  title: string;
  authors?: Array<string>;
  affiliations: Array<string>;
  summary: string;
  estado_tecnica?: File;
  country? : string;
  claims?: File;
  dibujo?: File;
}
