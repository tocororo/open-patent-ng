import { Environment } from 'toco-lib';

export const ME = [
  {
    nameTranslate : "INICIO",
    href : "/",
    target :"_blank",
    useRouterLink : true
  },
  {
    nameTranslate : "ORGANIZACIONES",
    href : "https://organizaciones.sceiba.cu",
    target :"_blank",
    useRouterLink : false
  },
  {
    nameTranslate : "PERSONAS",
    href : "https://personas.sceiba.cu",
    target :"_blank",
    useRouterLink : false
  },
  {
    nameTranslate : "CATALOGO",
    href : "https://catalogo.sceiba.cu",
    target :"_blank",
    useRouterLink : false
  },
  {
    nameTranslate : "REVISTAS_MES",
    href : "https://revistasmes.sceiba.cu",
    target :"_blank",
    useRouterLink : false
  },
  {
    nameTranslate : "EVALUACION",
    href : "https://evaluaciones.sceiba.cu",
    target :"_blank",
    useRouterLink : false
  },
  {
    nameTranslate : "VOCABULARIO",
    href : "https://vocabularios.sceiba.cu/es",
    target :"_blank",
    useRouterLink : false
  }
];

export const menuHelp = [
  {
    nameTranslate : "ACERCA_DE",
    href : "/help/about",
    useRouterLink : true,
    icon: "info",
    click: () => console.log("login===")

  },
  // {
  //   nameTranslate : "PRIVACIDAD",
  //   href : "/help/policy",
  //   useRouterLink : true,
  //   icon: "security"
  // },
  {
    nameTranslate : "CONTACTOS",
    href : "/help/contact",
    useRouterLink : true,
    icon: "contacts",
    click: () => console.log("login===")

  },
];

export const menuApps = [
  {
    nameTranslate : "SCEIBA",
    href : "https://sceiba.cu",
    target: "_blank",
    useRouterLink : false,
    img: {src: "/assets/images/svg/sceiba.svg", style: ""},
    divider: true
  },
  {
    nameTranslate : "BUSQUEDA",
    href : "https://sceiba.cu/search",
    target: "_blank",
    useRouterLink : false,
    img: {src: "/assets/images/svg/faro_neg.svg", style: ""}
  },
  {
    nameTranslate : "ORGANIZACIONES",
    href : "https://organizaciones.sceiba.cu",
    target: "_blank",
    useRouterLink : false,
    img: {src: "/assets/images/svg/organizaciones.svg", style: "width: 60px; height: 60px;"}
  },
  {
    nameTranslate : "VOCABULARIOS",
    href : "https://vocabularios.sceiba.cu",
    target: "_blank",
    useRouterLink : false,
    img: {src: "/assets/images/svg/vocabs.svg", style: "width: 55px; height: 55px"},
    divider: true
  },
  {
    nameTranslate : "REVISTAS_MES",
    href : "https://revistasmes.sceiba.cu",
    target: "_blank",
    useRouterLink : false,
    img: {src: "/assets/images/svg/catalog.svg", style: "width: 55px; height: 55px"}
  },
  {
    nameTranslate : "SMOODLE",
    href : "https://cursos.sceiba.org",
    target: "_blank",
    useRouterLink : false,
    img: {src: "/assets/images/svg/cast-for-education.svg", style: "width: 55px; height: 55px"}
  },
  {
    nameTranslate : "EVALUACION",
    href : "https://evaluaciones.sceiba.cu",
    target: "_blank",
    useRouterLink : false,
    img: {src: "/assets/images/svg/evaluations.svg", style: "width: 55px; height: 55px"}
  },
];
