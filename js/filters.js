import {mapping} from "./mushroom-query.js";

export const currentFilter = {}

export const initializeFilters = () => Object.entries(mapping).forEach(
  filter => {
    const filterName = filter[0];
    const filterContainer = document.getElementById(filterName);
    filter[1].unknown = undefined;
    if (filterContainer) {
      const options = Object.entries(filter[1])
        .map(option => {
            const optionName = option[0];
            return `<div class="col"><a href="#">
              <img class="img-thumbnail" src="img/${optionName}_icon.png" width="100px" alt="${optionName}" id="${filterName}-option-${optionName}"
                  data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="${optionName}"/>
              </a></div>`;
          }
        )
        .join('');

      filterContainer.innerHTML = `
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="${filterName}-button">${filterName}</button>
        <div class="dropdown-menu">
          <div class="row row-cols-2">${options}</div>
        </div>`;

      filterContainer.addEventListener("hide.bs.dropdown", (event) => {
        const element = event.clickEvent?.srcElement;
        if (!element || !element.id.startsWith(`${filterName}-option`)) {
          return;
        }
        const optionName = element.alt;
        const filterButton = document.getElementById(`${filterName}-button`);

        if (optionName === 'unknown') {
          filterButton.innerHTML = filterName;
          currentFilter[filterName] = undefined;
        } else {
          filterButton.innerHTML =
            `<img class="img-thumbnail" src="img/${optionName}_icon.png" width="100px" alt="${optionName}"/>`;
          currentFilter[filterName] = optionName;
        }
      });
    }
  }
)
