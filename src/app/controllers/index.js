const fs = require('fs') // gerencia arquivos
const path = require('path') // gerencia diretorios

module.export = app => {
    fs
    .readdirSync(__dirname) // lendo um arquivo do index.js
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== 'index.js'))) //filtrando meus arquivos que não com . ou index.js
    .forEach(file => require (path.resolve(__dirname, file))(app)); //percorrendo por todos os arquivos
}