import {queryDispatcher} from "./wikidata-client.js";

const mapping = {
  "ecologicalType": {
    "saprotrophic": "Q114750",
    "mycorrhizal": "Q99974",
    "parasitic": "Q186517",
    "nematophagous": "Q357006"
  },
  "stipeCharacter": {
    "bare": "Q14544581",
    "ring": "Q14544582",
    "volva": "Q19887985",
    "ring and volva": "Q19887987",
    "cortina": "Q19887988",
  },
  "hymeniumType": {
    "gills": "Q269345",
    "pores": "Q19861549",
    "smooth": "Q19861550",
    "ridges": "Q19861551",
    "teeth": "Q19861552",
    "gleba": "Q2034230",
  },
  "capShape": {
    "campanulate": "Q19887953",
    "conical": "Q19887954",
    "convex": "Q14544535",
    "depressed": "Q19887955",
    "flat": "Q19887957",
    "infundibuliform": "Q19887958",
    "offset": "Q14544541",
    "ovate": "Q19887961",
    "umbilicate": "Q19887962",
    "umbonate": "Q19887964",
    "no": "Q19887965",
    "concave to plane": "Q23058598",
    "semi-spherical": "Q62023127",
  },
  "whichGills": {
    "adnate": "Q14544569",
    "adnexed": "Q19887923",
    "decurrent": "Q19887925",
    "emarginate": "Q19887926",
    "free": "Q14544563",
    "seceding": "Q19887929",
    "sinuate": "Q19887930",
    "subdecurrent": "Q19887931",
    "no": "Q19887932",
  },
  "sporePrintColor": {
    "black": "Q23445",
    "blackish-brown": "Q19888339",
    "brown": "Q47071",
    "buff": "Q2085487",
    "cream": "Q2730433",
    "green": "Q3133",
    "ochre": "Q194191",
    "olive": "Q864152",
    "olive-brown": "Q19888352",
    "pink": "Q429220",
    "pinkish-brown": "Q19888366",
    "purple": "Q3257809",
    "purple-black": "Q19888373",
    "purple-brown": "Q19888381",
    "salmon": "Q2015138",
    "tan": "Q1670336",
    "white": "Q23444",
    "yellow": "Q943",
    "yellow-orange": "Q16645086",
    "yellow-brown": "Q19888422",
    "bordeaux": "Q10859033",
    "reddish-brown": "Q62058583",
  },
  "howEdible": {
    "choice": "Q19888517",
    "edible": "Q654236",
    "inedible": "Q4317894",
    "caution": "Q19888537",
    "psychoactive": "Q1169875",
    "poisonous": "Q19888562",
    "allergenic": "Q19888579",
    "deadly": "Q19888591",
    "edible when cooked": "Q62102033",
    "medicinal": "Q1686195",
  },
}

const sparqlQuery = (params) =>
  `SELECT DISTINCT ?itemLabel ?item (SAMPLE(?itemImage) AS ?itemImageSample) WHERE {
    ?item p:P171/(ps:P171/(wdt:P171*)) wd:Q27720.
    OPTIONAL { ?item wdt:P18 ?itemImage. }
    ${params.hymeniumType ? `?item p:P783/(ps:P783/(wdt:P279*)) wd:${mapping.hymeniumType[params.hymeniumType]}.` : ""}
    ${params.capShape ? `?item p:P784/(ps:P784/(wdt:P279*)) wd:${mapping.capShape[params.capShape]}.` : ""}
    ${params.whichGills ? `?item p:P785/(ps:P785/(wdt:P279*)) wd:${mapping.whichGills[params.whichGills]}.` : ""}
    ${params.stipeCharacter ? `?item p:P786/(ps:P786/(wdt:P279*)) wd:${mapping.stipeCharacter[params.stipeCharacter]}.` : ""}
    ${params.sporePrintColor ? `?item p:P787/(ps:P787/(wdt:P279*)) wd:${mapping.sporePrintColor[params.sporePrintColor]}.` : ""}
    ${params.ecologicalType ? `?item p:P788/(ps:P788/(wdt:P279*)) wd:${mapping.ecologicalType[params.ecologicalType]}.` : ""}
    ${params.howEdible ? `?item p:P789/(ps:P789/(wdt:P279*)) wd:${mapping.howEdible[params.howEdible]}.` : ""}
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }
  GROUP BY  ?itemLabel ?item`;

export const getParams = () => Object.fromEntries(Object.entries(mapping)
  .map(param => [param[0], document.getElementById(param[0])?.value])
  .filter(param => param[1]));

export const queryWithFilters = () => queryDispatcher.query(sparqlQuery(getParams()));
