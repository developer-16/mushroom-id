import {mapping} from "./mushroom-query.js";

export const prepareFilters = () => Object.entries(mapping).forEach(
  entry => {
    const select = document.getElementById(entry[0]);
    if (select) {
      const options = Object.entries(entry[1])
        .map(option =>
          `<li id="${option[0]}"><a href="#">
            <img class="img-thumbnail" src="img/${option[0]}_icon.png" width="100px" alt="${option[0]}"
                data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="${option[0]}"/>
           </a></li>`
        )
        .join('');

      select.innerHTML = `
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="${entry[0]}-button">${entry[0]}</button>
      <ul class="dropdown-menu">${options}</ul>
  `
      select.addEventListener("hide.bs.dropdown", (event) => {
        const parent = event.clickEvent.srcElement.parentElement;
        const id = parent.id ? parent.id : parent.parentElement.id;
        document.getElementById(`${entry[0]}-button`).innerHTML =
          `<img class="img-thumbnail"  src="img/${id}_icon.png" width="100px" alt="${id}"/>`;
      });
    }
  }
)
