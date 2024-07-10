import {getParams, toGalleryEntry} from "./app";

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

test('should get the parameters from the form', () => {
  document.body.innerHTML = `
        <select id="stipeCharacter">
          <option value="ring" selected>ring</option>
        </select>
        <select id="ecologicalType">
          <option value="parasitic" selected>parasitic</option>
        </select>
  `
  expect(getParams()).toEqual({
    "ecologicalType": "parasitic",
    "stipeCharacter": "ring"
  });
})
