import {toGalleryEntry} from "./gallery-helper.js";
import {initializeFilters} from "./filters.js";
import {getCount, getResults, login} from "./mongodb-client.js";

const search = (event) => {
  event.preventDefault();

  const currentFilter = getCurrentFilter();

  const main = document.getElementById('main');
  const status = document.getElementById('search-status');
  main.textContent = '';
  getResults(currentFilter).then(response => {
    response.map((entry) => main.appendChild(toGalleryEntry(entry)));
  });
  status.innerHTML = `Loading...`
  getCount(currentFilter).then(response => {
    status.innerHTML = `Found ${response} results.`
  });

  return false;
}

const count = (event) => {
  if (event.target.type !== 'radio' && (event.target.type !== 'reset')) {
    return;
  }

  setTimeout(
    () => {
      const currentFilter = getCurrentFilter();

      const showButton = document.getElementById('show-button');
      getCount(currentFilter).then(response => {
        showButton.innerHTML = `Show ${response} matches`
      });
    }, 1
  )
}

const getCurrentFilter = () => {
  const currentFilter = {};
  Array.from(document.getElementById('form').elements)
    .filter(e => e.checked)
    .forEach(e => currentFilter[e.name] = e.value !== 'unknown' ? e.value : undefined);
  return currentFilter;
};

const initializeTooltips = () => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
};

document.getElementById('form').addEventListener("submit", search);
document.getElementById('form').addEventListener("click", count);
initializeFilters();
initializeTooltips();
login().catch(console.dir);
