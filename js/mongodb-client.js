import * as Realm from "realm-web";

const APP_ID = 'web-client-meviqxd';
const ATLAS_SERVICE = 'mongodb-atlas';
const app = new Realm.App({id: APP_ID});

export const login = async () => {
  const credentials = Realm.Credentials.anonymous();
  try {
    await app.logIn(credentials);
  } catch (err) {
    console.error("Failed to log in", err);
  }
};

const prepareFilter = currentFilter => {
  const filter = {};
  if (currentFilter.hymeniumType) {
    filter["hymenium.type"] = currentFilter.hymeniumType
    if (currentFilter.hymeniumType === "gills") {
      filter["hymenium.type"] = "lamella"
    }
  }
  if (currentFilter.capShape) {
    filter["cap.shape"] = currentFilter.capShape
    if (currentFilter.capShape === "no-cap") {
      filter["cap.shape"] = "no"
    }
  }
  if (currentFilter.whichGills) {
    filter["hymenium.stipeConnection"] = currentFilter.whichGills
    if (currentFilter.whichGills === "no-gills") {
      filter["hymenium.stipeConnection"] = "no"
    }
  }
  switch (currentFilter.stipeCharacter) {
    case 'bare':
      filter["stipe.ring"] = false
      filter["stipe.volva"] = false
      break;
    case 'ring':
      filter["stipe.ring"] = true
      filter["stipe.volva"] = false
      break;
    case 'volva':
      filter["stipe.ring"] = false
      filter["stipe.volva"] = true
      break;
    case 'ring-and-volva':
      filter["stipe.ring"] = true
      filter["stipe.volva"] = true
      break;
    case 'cortina':
      filter["stipe.ring"] = true
      filter["stipe.volva"] = false
      break;
  }
  if (currentFilter.sporePrintColor) {
    filter["spores.colour"] = currentFilter.sporePrintColor
    if (currentFilter.sporePrintColor === "olive-brown") {
      filter["spores.colour"] = "olive brown"
    }
  }
  if (currentFilter.ecologicalType) {
    filter["ecology"] = currentFilter.ecologicalType
  }

  ['division', 'class', 'order', 'family', 'genus']
    .filter((taxon) => currentFilter[taxon])
    .forEach((taxon) => {
      filter[`name.${taxon}`] = currentFilter[taxon]
    });
  return filter;
};

export const getResults = async (currentFilter) => {
  let collection;
  try {
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    collection = mongodb.db("fungi").collection("mushrooms");
  } catch (err) {
    console.error("Need to log in first", err);
    return;
  }
  const filter = prepareFilter(currentFilter);
  return collection.find(filter, {limit: 20});
};

export const getCount = async (currentFilter) => {
  let collection;
  try {
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    collection = mongodb.db("fungi").collection("mushrooms");
  } catch (err) {
    console.error("Need to log in first", err);
    return;
  }
  const filter = prepareFilter(currentFilter);
  return collection.count(filter);
};

export const getChildTaxons = async (currentFilter, level) => {
  let collection;
  try {
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    collection = mongodb.db("fungi").collection("mushrooms");
  } catch (err) {
    console.error("Need to log in first", err);
    return;
  }
  const filter = prepareFilter(currentFilter);
  const match = {
    "$match": filter
  }
  const group = {
    "$group": {_id: `\$${level}`, count: {$sum: 1}}
  }
  return collection.aggregate([match, group]);
};
