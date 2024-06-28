import {getParams} from "./mushroom-query.js";

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
