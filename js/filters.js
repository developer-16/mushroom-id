import {mapping} from "./mushroom-query.js";

export const initializeFilters = () => Object.entries(mapping).forEach(
  filter => {
    const filterName = filter[0];
    const filterContainer = document.getElementById(filterName);
    filter[1].unknown = undefined;
    if (filterContainer) {
      const options = Object.entries(filter[1])
        .map(option => {
            const optionName = option[0];
            return `
            <div class="form-check">
              <input class="btn-check" type="radio" name="${filterName}" value="${optionName}" id="${filterName}-option-${optionName}">
              <label class="btn" for="${filterName}-option-${optionName}">
                <img class="img-thumbnail" src="img/${optionName}_icon.png" width="100px" alt="${optionName}"/>
              </label>
            </div>
            `;
          }
        )
        .join('');

      filterContainer.innerHTML = `<div class="row row-cols-2">${options}</div>`;
    }
  }
)
