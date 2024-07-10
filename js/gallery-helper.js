export const toGalleryEntry = entry => {
  const displayEntry = document.createElement("div");

  const link = entry.itemImageSample?.value ? entry.itemImageSample?.value : "img/icon-image-not-found.jpg";

  displayEntry.className = 'col py-1'
  displayEntry.innerHTML =
    `<a class="card" target="_blank" href="https://wikipedia.org/wiki/${entry.itemLabel.value}">
        <h5 class="card-title">${entry.itemLabel.value}</h5>
        <img class="card-img-bottom" src="${link}" alt="${entry.itemLabel.value}">
     </a>`
  return displayEntry;
};
