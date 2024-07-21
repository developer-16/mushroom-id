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
              <input class="btn-check" type="radio" name="${filterName}" value="${optionName}" id="${filterName}-option-${optionName}">
              <label class="btn p-0" for="${filterName}-option-${optionName}">
                <img class="img-thumbnail" src="img/${optionName}_icon.png" width="80px" alt="${optionName}"
                    data-bs-toggle="tooltip" data-bs-title="${optionName}"/>
              </label>
            `;
          }
        )
        .join('');

      filterContainer.innerHTML = `
          <label class="form-label">${filterName}</label>
          <div class="mb-3">${options}</div>
      `;
    }
  }
)
