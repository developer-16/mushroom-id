class SPARQLQueryDispatcher {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  query(sparqlQuery) {
    const fullUrl = this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
    const headers = {'Accept': 'application/sparql-results+json'};

    return fetch(fullUrl, {headers}).then(body => body.json());
  }
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);

const sparqlQuery = (params) =>
  `SELECT DISTINCT ?itemLabel ?item (SAMPLE(?itemImage) AS ?itemImageSample) WHERE {
    ?item p:P171/(ps:P171/(wdt:P171*)) wd:Q27720.
    OPTIONAL { ?item wdt:P18 ?itemImage. }
    ${params.ecologicalType ? `?item p:P788/(ps:P788/(wdt:P279*)) wd:${mapping.ecologicalType[params.ecologicalType]}.` : ""}
    ${params.stipeCharacter ? `?item p:P786/(ps:P786/(wdt:P279*)) wd:${mapping.stipeCharacter[params.stipeCharacter]}.` : ""}
    ${params.hymeniumType ? `?item p:P783/(ps:P783/(wdt:P279*)) wd:${mapping.hymeniumType[params.hymeniumType]}.` : ""}
    ${params.capShape ? `?item p:P784/(ps:P784/(wdt:P279*)) wd:${mapping.capShape[params.capShape]}.` : ""}
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }
  GROUP BY  ?itemLabel ?item`;

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
    "adnate": "Q19887953",
    "adnexed": "Q19887954",
    "decurrent": "Q14544535",
    "emarginate": "Q19887955",
    "free": "Q19887957",
    "seceding": "Q19887958",
    "sinuate": "Q14544541",
    "subdecurrent": "Q19887961",
    "no": "Q19887962",
  },
  "sporePrintColor": {
    "black": "TODO",
    "blackish-brown": "TODO",
    "brown": "TODO",
    "buff": "TODO",
    "cream": "TODO",
    "green": "TODO",
    "ochre": "TODO",
    "olive": "TODO",
    "olive-brown": "TODO",
    "pink": "TODO",
    "pinkish-brown": "TODO",
    "purple": "TODO",
    "purple-black": "TODO",
    "purple-brown": "TODO",
    "reddish-brown": "TODO",
    "salmon": "TODO",
    "tan": "TODO",
    "white": "TODO",
    "yellow": "TODO",
    "yellow-orange": "TODO",
    "yellow-brown": "TODO",
  },
}

function appendChildText(main, text) {
  const loadingText = document.createElement("div");
  loadingText.textContent = text;
  main.appendChild(loadingText);
}

export function toGalleryEntry(entry) {
  const displayEntry = document.createElement("a");
  displayEntry.className = 'gallery';
  displayEntry.href = `https://wikipedia.org/wiki/${entry.itemLabel.value}`

  const description = document.createElement("div");
  description.className = 'desc';
  description.textContent = entry.itemLabel.value;
  displayEntry.appendChild(description);

  const image = document.createElement("img");
  const imageLink = entry.itemImageSample?.value;
  image.src = imageLink ? imageLink : "img/icon-image-not-found.jpg";
  displayEntry.appendChild(image);

  return displayEntry;
}

export const getParams = () => Object.fromEntries(Object.entries(mapping)
  .map(param => [param[0], document.getElementById(param[0])?.value])
  .filter(param => param[1]));

export const updateResults = (event) => {
  event.preventDefault();

  const main = document.getElementById('main');
  main.textContent = "";
  appendChildText(main, "Loading...");
  queryDispatcher.query(sparqlQuery(getParams())).then(response => {
    appendChildText(main, `Found ${response.results.bindings.length} results.`);
    response.results.bindings.map((entry) => main.appendChild(toGalleryEntry(entry)));
    main.removeChild(main.firstChild);
  });

  return false;
}

document.onload = () => document.getElementById('form').addEventListener("submit", updateResults);

