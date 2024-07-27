import {toGalleryEntry} from "./gallery-helper.js";
import {initializeFilters} from "./filters.js";
import {getChildTaxons, getCount, getResults, login} from "./mongodb-client.js";

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
  if (!['OPTION', 'BUTTON', 'INPUT', 'SELECT'].includes(event.target.tagName)) {
    return;
  }

  setTimeout(
    () => {
      const currentFilter = getCurrentFilter();

      const showButton = document.getElementById('show-button');
      getCount(currentFilter).then(response => {
        showButton.innerHTML = `Show ${response} matches`
      });
      updateTaxonCounts();
    }, 1
  )
}

const updateTaxonCounts = () => {
  const filter = getCurrentFilter();
  ['division', 'class', 'order', 'family', 'genus']
    .filter((taxon) => !filter[taxon])
    .forEach((taxon) => {
      getChildTaxons(filter, `name.${taxon}`).then(response => {
        document.getElementById(taxon).innerHTML =
          `<option disabled selected value> -- select the ${taxon} -- </option>` +
          response
            .map((entry) => `<option value="${entry._id}">${entry._id}: ${entry.count}</option>`)
            .join('');
      });
    });
};

const getCurrentFilter = () => {
  const currentFilter = {};
  Array.from(document.getElementById('form').elements)
    .filter(e => e.checked || e.tagName === 'SELECT')
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
updateTaxonCounts();
