import {queryWithFilters} from "./mushroom-query.js";
import {toGalleryEntry} from "./gallery-helper.js";
import {prepareFilters} from "./filters.js";

const appendChildText = (main, text) => {
  const loadingText = document.createElement("p");
  loadingText.textContent = text;
  main.appendChild(loadingText);
};

const appendSpinner = (element) => {
  element.innerHTML =
    `<p>Loading...</p>`
};

const updateResults = (event) => {
  event.preventDefault();

  const main = document.getElementById('main');
  const status = document.getElementById('search-status');
  main.textContent = '';
  status.textContent = '';
  appendSpinner(status);
  queryWithFilters().then(response => {
    appendChildText(status, `Found ${response.results.bindings.length} results.`);
    response.results.bindings.map((entry) => main.appendChild(toGalleryEntry(entry)));
    status.removeChild(status.firstChild);
  });

  return false;
}

document.getElementById('form').addEventListener("submit", updateResults);
prepareFilters();
