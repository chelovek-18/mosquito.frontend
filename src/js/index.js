/* Mosquito team 2017 */
'use strict';
// Component includes example
const example = require('./example/example');
// Styles include example
const style = require('../css/example.css');
// ES7 features example
(async function main(){
    console.log("wait...");
    console.log(await example());
})();