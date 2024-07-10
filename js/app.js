import {queryWithFilters} from "./mushroom-query.js";
import {toGalleryEntry} from "./gallery-helper.js";
import {initializeFilters} from "./filters.js";

const appendChildText = (main, text) => {
  const loadingText = document.createElement("p");
  loadingText.textContent = text;
  main.appendChild(loadingText);
};

const search = () => {
  const main = document.getElementById('main');
  const status = document.getElementById('search-status');
  main.textContent = '';
  status.innerHTML = `<p>Loading...</p>`
  queryWithFilters().then(response => {
    appendChildText(status, `Found ${response.results.bindings.length} results.`);
    response.results.bindings.map((entry) => main.appendChild(toGalleryEntry(entry)));
    status.removeChild(status.firstChild);
  });
}

const initializeTooltips = () => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
};

document.getElementById('form').addEventListener("click", search);
initializeFilters();
initializeTooltips();
