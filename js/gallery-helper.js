const toDescription = entry => `
  <dl class="row">
    <dt class="col-sm-6">Ecology</dt>
    <dd class="col-sm-6">${entry.ecology}</dd>
    <dt class="col-sm-6">Cap shape</dt>
    <dd class="col-sm-6">${entry.cap?.shape}</dd>
    <dt class="col-sm-6">Has a volva</dt>
    <dd class="col-sm-6">${entry.stipe?.volva}</dd>
    <dt class="col-sm-6">Has a ring</dt>
    <dd class="col-sm-6">${entry.stipe?.ring}</dd>
    <dt class="col-sm-6">Under-cap</dt>
    <dd class="col-sm-6">${entry.hymenium?.type}</dd>
    <dt class="col-sm-6">Edibility</dt>
    <dd class="col-sm-6">${entry.usage}</dd>
    <dt class="col-sm-6">Spore colour</dt>
    <dd class="col-sm-6">${entry.spores?.colour}</dd>
  </dl>`;

export const toGalleryEntry = entry => {
  const displayEntry = document.createElement("div");

  const link = entry.images[0] ? entry.images[0] : "img/icon-image-not-found.jpg";

  displayEntry.className = 'col py-1'
  displayEntry.innerHTML =
    `<a class="card" target="_blank" href="https://wikipedia.org/wiki/${entry.name.main}">
        <h5 class="card-title">${entry.name.main}</h5>
        <img class="card-img-bottom gallery-image" src="${link}" alt="${entry.name.main}">
        <div class="gallery-description">${toDescription(entry)}</div>
     </a>`
  return displayEntry;
};
