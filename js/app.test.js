import {toGalleryEntry} from "./app";

test('should get the parameter list', () => {
  expect(toGalleryEntry({
    "itemLabel": {
      "value": "Amanita Muscaria"
    },
    "itemImageSample": {
      "value": "https://image.jpg"
    }
  }).outerHTML).toBe(
    `<a class="gallery" href="https://wikipedia.org/wiki/Amanita Muscaria"><div class="desc">Amanita Muscaria</div><img src="https://image.jpg"\></a>`
  )
})
