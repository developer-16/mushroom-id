import {parameters} from "./parameters.js";

export const initializeFilters = () => Object.entries(parameters).forEach(
  filter => {
    const filterName = filter[0];
    const filterContainer = document.getElementById(filterName);
    filter[1].options.push("unknown")
    if (filterContainer) {
      const options = filter[1].options.map(option => {
          return `
              <input class="btn-check" type="radio" name="${filterName}" value="${option}" id="${filterName}-option-${option}">
              <label class="btn p-0" for="${filterName}-option-${option}">
                <img class="img-thumbnail" src="img/${option}_icon.png" width="80px" alt="${option}"
                    data-bs-toggle="tooltip" data-bs-title="${option}"/>
              </label>
            `;
        }
      ).join('');

      filterContainer.innerHTML = `
          <label class="form-label">${filter[1].name}</label>
          <div class="mb-3">${options}</div>
      `;
    }
  }
)
