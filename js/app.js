import {queryWithFilters} from "./mushroom-query.js";
import {toGalleryEntry} from "./gallery-helper.js";

const appendChildText = (main, text) => {
  const loadingText = document.createElement("div");
  loadingText.textContent = text;
  main.appendChild(loadingText);
};

const updateResults = (event) => {
  event.preventDefault();

  const main = document.getElementById('main');
  main.textContent = "";
  appendChildText(main, "Loading...");
  queryWithFilters().then(response => {
    appendChildText(main, `Found ${response.results.bindings.length} results.`);
    response.results.bindings.map((entry) => main.appendChild(toGalleryEntry(entry)));
    main.removeChild(main.firstChild);
  });

  return false;
}

document.getElementById('form').addEventListener("submit", updateResults);
