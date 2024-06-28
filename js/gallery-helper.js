export const toGalleryEntry = entry => {
  const displayEntry = document.createElement("a");
  displayEntry.className = 'gallery';
  displayEntry.href = `https://wikipedia.org/wiki/${entry.itemLabel.value}`

  const description = document.createElement("div");
  description.className = 'desc';
  description.textContent = entry.itemLabel.value;
  displayEntry.appendChild(description);

  const image = document.createElement("img");
  const imageLink = entry.itemImageSample?.value;
  image.src = imageLink ? imageLink : "img/icon-image-not-found.jpg";
  displayEntry.appendChild(image);

  return displayEntry;
};
