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
    `<a class="gallery" href="https://wikipedia.org/wiki/Amanita Muscaria"><div class="desc">Amanita Muscaria</div><img src="https://image.jpg"\></a>`
  )
})
