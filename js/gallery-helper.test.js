import {toGalleryEntry} from "./gallery-helper.js";

test('should convert gallery entry to html', () => {
  expect(toGalleryEntry({
    "itemLabel": {
      "value": "Amanita Muscaria"
    },
    "itemImageSample": {
      "value": "https://image.jpg"
    }
  }).outerHTML).toEqual(
    `<div class="col py-1"><a class="card" target="_blank" href="https://wikipedia.org/wiki/Amanita Muscaria">
        <h5 class="card-title">Amanita Muscaria</h5>
        <img class="card-img-bottom" src="https://image.jpg" alt="Amanita Muscaria">
     </a></div>`
  )
})
