import {queryWithFilters} from "./mushroom-query.js";
import {toGalleryEntry} from "./gallery-helper.js";
import {initializeFilters} from "./filters.js";

const search = () => {
  const main = document.getElementById('main');
  const status = document.getElementById('search-status');
  main.textContent = '';
  status.innerHTML = `Loading...`
  queryWithFilters().then(response => {
    response.results.map((entry) => main.appendChild(toGalleryEntry(entry)));
    status.innerHTML = `Found ${response.total} results.`
  });
}

const initializeTooltips = () => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
};

document.getElementById('form').addEventListener("click", search);
initializeFilters();
initializeTooltips();
