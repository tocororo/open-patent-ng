import { Entity, Role } from 'toco-lib';


export class OpenPatent{
  title: string;
  author?: string;
  co_author?: Array<string>;
  affiliations: Array<string>;
  organization?: string;
  summary: string;
  estado_tecnica?: File;
  documentos_asociados?: Array<File>;
  dibujo?: File;
}
