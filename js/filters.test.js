import {prepareFilters} from "./filters.js";

test('should convert gallery entry to html', () => {
  document.body.innerHTML = `
    <div class="dropend mb-2" id="ecologicalType"></div>
    <div class="dropend mb-2" id="stipeCharacter"></div>
    <div class="dropend mb-2" id="hymeniumType"></div>
    <div class="dropend mb-2" id="capShape"></div>
    <div class="dropend mb-2" id="whichGills"></div>
    <div class="dropend mb-2" id="sporePrintColor"></div>
  `

  prepareFilters();

  expect(document.body.innerHTML).toEqual(`
    <div class="dropdown" id="hymeniumType">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">hymeniumType</button>
      <ul class="dropdown-menu">
      </ul>
    </div>
  `
  )
})
