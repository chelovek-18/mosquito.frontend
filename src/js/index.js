/* Mosquito team 2017 */
'use strict';
// Component includes example
import {example} from "./example/example";
// Styles include example
import css from '!css-loader!../css/example.css'; // css as object
import '../css/example.css'; //css includes to bundle
// ES7 features example
(async function main(){
    console.log("wait...");
    console.log(await example());
})();
// DOM example
window.onload = function () {
    let elem = document.getElementById('dynamic'), i = 0;
    setInterval(() => { elem.innerText = `DOM manipulation example: ${i++}` }, 1000);
};