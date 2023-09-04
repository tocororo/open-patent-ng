
import { Entity, Role } from 'toco-lib';

/**
 * Entity for `Person` based on schema `...-v1.0.0.json`. 
 */
export class Person extends Entity
{
   /****************************************************
    * `id` and `identifiers` are extended from `Entity`
    ****************************************************/

   /**
    * Person gender
    */
   gender: string;

   /**
    * Profile of the people in Sceiba, the details
    */
    url: string;

   /**
    * Person last name
    */
   lastName: string

   /**
    * Person name. 
    */
   name: string;

   /**
    * Control vocabulary of country, ISO 3166-1 alpha-2
    */
   country: string;

   /**
    * Person email
    */
   email: string;

   /**
    * Por defecto los perfiles son públicos en cuanto a datos de interés de identificación, tales como los ids, aliases, uri, name y lastName, country, academicTitles
    * Los que pueden no mostrarse puede valorarse respPublications, researchInterestsm,  keyWords, affiliations, subaffiliations, boardMember y tgLeader
    * Los rolesSceiba solo serán visibles para el propio usuario, o con permisos para ello.
    */
   publicProfile: boolean;

   /**
    * Vocabulario UNESCO (Por defecto sería el de la UNESCO pero debe ofrecerse cambiar vocabulario a uno de los especializados de la lista que tenemos)
    */
   researchInterests: Array<string>;

   /**
    * Palabras claves, es libre lo que ponga el usuario, es como la especialización dentro de los intereses de investigación.
    * si fuese controlado deberí ser el de la UNESCO
    */
   keyWords: Array<string>;

   /**
    * Person name variants
    */
   aliases: Array<string>;

    /**
     * 
     */
   academicTitles: Array<string>;

   /**
    * Afiliaciones (Organizaciones a las que esta afiliado, eso incluye academia de ciencia, el pcc mismo) debe verse el periodo que ha tenido esa afiliación.
    */
   /**************************************si se guarda el periodo tambien no puede ser un string pq no refleja la relacion de la afiliacion con el tiempo */
   affiliations: Array<string>;

   /**
    * Subafiliaciones (Departamentos, laboratorios, y otros… seria la estructura interna que le daría organizaciones a partir del 3er nivel que logro tomar de VIVO o que alguien editó)
    */
   /***************************************estas subafiliaciones son independientes de las afiliaciones en si???? no refleja la dependencia del padre. */
   subaffiliations: Array<string>;

   /**
    * Board-Member: Responsabilidades dentro de la organización (A partir de un vocabulario controlado)  La membresía es a partir del vocabulario pero debes especificar con cual organización afiliado o subafiliado
    */
   boardMember: Array<string>;

   /**
    * TG-Leader de algo de que es miembro
    */
   tgLeader: string;

   /**
    * Si este usuario está activo o no el sistema, si no está activo es como si no existiera pero a los efectos de los usuario administrativos sí existe.
    */
   active: boolean;
   
   /**
    * Array de Roles en Sceiba
    */
   rolesSceiba: Array<Role>;

   /**
    * Cantidad de artículos en sceiba que quizás ha escrito esta persona.
    */
   pendingArticles: number;

   /**
    * Responsabilidad que tiene sobre las publicaciones (El id, el Rol en esas publicaciones según lenguaje controlado Autor, Editor, Corrector. Etc… ver vocab de CERIF https://w3id.org/cerif/vocab/PersonOutputContributions ) 
    * Al decir en sceiba que una persona es editor de una revista, entonces ya tiene relación con todos esos artículos.
    * Debe ser capaz de tomar datos de sceiba y otros lugares, pero debe ser capaz de tener el esos datos.
    * Reviewer
    * Contributor
    * Performer
    * Choreographer
    * Applicant
    * Author
    * Author (numbered)
    * Author (percentage)
    * Creator
    * Editor
    * Translator
    * Publisher
    * Commissioner
    * Group Authors
    * Subject
    * Illustrator
    * Guest Editor
    * Inventor
    * Holder
    * Designer
    * Artist
    * Constructor
    * Composer
    * Programmer
    * Analyst
    * Validator
    * Tester
    */
    respPublications: Array<{ revista: string, roles: Array<string>}>;

   /************************************* More Data ******************************/
}
