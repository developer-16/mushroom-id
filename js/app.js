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

const sparqlQuery = (params) => `#   Q221448
SELECT DISTINCT ?itemLabel ?item (SAMPLE(?itemImage) AS ?itemImageSample) ?hymeniumTypeLabel ?hymeniumType ?capShapeLabel ?capShape ?hymeniumAttachmentLabel ?hymeniumAttachment ?StipeCharacterLabel ?StipeCharacter ?sporePrintColorLabel ?sporePrintColor ?ecologicalTypeLabel ?ecologicalType ?edibilityLabel ?edibility WHERE {
  ?item p:P171 ?statement0.
  ?statement0 (ps:P171/(wdt:P171*)) wd:Q27720.
  OPTIONAL {  ?item wdt:P18 ?itemImage. }
  ?item p:P788/(ps:P788/(wdt:P279*)) wd:${mapping.ecologicalType[params.ecologicalType]}.
  ?item p:P783/(ps:P783/(wdt:P279*)) wd:Q19861549.
  ?item p:P784/(ps:P784/(wdt:P279*)) wd:Q19887957.
  OPTIONAL { ?item wdt:P783 ?hymeniumType. }
  OPTIONAL { ?item wdt:P784 ?capShape. }
  OPTIONAL { ?item wdt:P785 ?hymeniumAttachment. }
  OPTIONAL { ?item wdt:P786 ?StipeCharacter. }
  OPTIONAL { ?item wdt:P787 ?sporePrintColor. }
  OPTIONAL { ?item wdt:P788 ?ecologicalType. }
  OPTIONAL { ?item wdt:P789 ?edibility. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
GROUP BY  ?itemLabel ?item ?hymeniumTypeLabel ?hymeniumType ?capShapeLabel ?capShape ?hymeniumAttachmentLabel ?hymeniumAttachment ?StipeCharacterLabel ?StipeCharacter ?sporePrintColorLabel ?sporePrintColor ?ecologicalTypeLabel ?ecologicalType ?edibilityLabel ?edibility`;

const mapping = {
  "ecologicalType": {
    "saprotrophic": "Q114750",
    "mycorrhizal": "Q99974",
    "parasitic": "Q186517",
    "nematophagous": "Q357006"
  }
}

export const updateResults = (event) => {
  event.preventDefault();
  const params = {
    "ecologicalType": document.getElementById('ecological-type').value
  };
  const main = document.getElementById('main');
  main.textContent = "";
  const loadingText = document.createElement("div");
  loadingText.textContent = "Loading...";
  main.appendChild(loadingText);
  queryDispatcher.query(sparqlQuery(params)).then(response => {
    response.results.bindings.map((entry) => {
      const displayEntry = document.createElement("div");
      displayEntry.className = 'gallery';
      const image = document.createElement("img");
      image.src = entry.itemImageSample.value;
      displayEntry.appendChild(image);
      const description = document.createElement("div");
      description.className = 'desc';
      description.textContent = entry.itemLabel.value;
      displayEntry.appendChild(description);
      main.appendChild(displayEntry);
    });
    main.removeChild(main.firstChild);
  });
  return false;
}

document.getElementById('form').addEventListener("submit", updateResults);
