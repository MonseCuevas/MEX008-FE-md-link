const mdLinks = require("./index.js");

const path = process.argv[2];

mdLinks(path, {validate: true})
  .then(result => {
    console.log(result);
  }, err => {
    console.log(err);
  });