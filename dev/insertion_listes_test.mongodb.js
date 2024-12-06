use("speutifye-api");

db.musiques.drop();
db.listes.drop();

const musiques = require('./musiques_test.json');
const listes = require('./listes_test.json');

db.musiques.insertMany(musiques);
db.listes.insertMany(listes);