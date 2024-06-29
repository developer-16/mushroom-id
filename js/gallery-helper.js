export const toGalleryEntry = entry => {
  const displayEntry = document.createElement("a");
  displayEntry.className = 'card col';
  displayEntry.target = '_blank';
  displayEntry.href = `https://wikipedia.org/wiki/${entry.itemLabel.value}`

  const description = document.createElement("h5");
  description.className = 'card-title';
  description.textContent = entry.itemLabel.value;
  displayEntry.appendChild(description);

  const image = document.createElement("img");
  const imageLink = entry.itemImageSample?.value;
  image.className = 'card-img-bottom';
  image.src = imageLink ? imageLink : "img/icon-image-not-found.jpg";
  displayEntry.appendChild(image);

  return displayEntry;
};
