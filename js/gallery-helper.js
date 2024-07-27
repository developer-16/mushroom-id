export const toGalleryEntry = entry => {
  const displayEntry = document.createElement("div");

  const link = entry.images ? entry.images[0] : "img/icon-image-not-found.jpg";

  displayEntry.className = 'col py-1'
  displayEntry.innerHTML =
    `<a class="card" target="_blank" href="https://wikipedia.org/wiki/${entry.name.main}">
        <h5 class="card-title">${entry.name.main}</h5>
        <img class="card-img-bottom" src="${link}" alt="${entry.name.main}">
     </a>`
  return displayEntry;
};
