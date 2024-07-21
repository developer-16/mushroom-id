import {queryWithFilters} from "./mushroom-query.js";
import {toGalleryEntry} from "./gallery-helper.js";
import {initializeFilters} from "./filters.js";
import {login, run} from "./mongodb-client.js";

const search = (event) => {
  event.preventDefault();

  const currentFilter = {};
  Array.from(event.srcElement.elements)
    .filter(e => e.checked)
    .forEach(e => currentFilter[e.name] = e.value !== 'unknown' ? e.value : undefined);

  const main = document.getElementById('main');
  const status = document.getElementById('search-status');
  main.textContent = '';
  status.innerHTML = `Loading...`
  queryWithFilters(currentFilter).then(response => {
    response.results.map((entry) => main.appendChild(toGalleryEntry(entry)));
    status.innerHTML = `Found ${response.total} results.`
  });
  run(currentFilter).catch(console.dir);

  return false;
}

const initializeTooltips = () => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
};

document.getElementById('form').addEventListener("submit", search);
initializeFilters();
initializeTooltips();
login().catch(console.dir);
