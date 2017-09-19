/* Mosquito team 2017 */
'use strict';

import { inf } from "./inf/inf";
const
    subj = { 'inf': inf };

window._mosq_ = new (
    class Mosquito
    {
        constructor( param ) {
            if ( param && param instanceof Array )
                Object.keys( subj ).forEach( ( m ) => { if ( !~param.indexOf( m ) ) delete subj[ m ]; } );
            Object.assign( this, subj );
        }

        rename() {
            Object.keys( window ).forEach( ( n ) => { if ( window[ n ] instanceof Mosquito ) delete window[ n ]; } );
            return new Mosquito;
        }
    }
)( window._mosq_ );


// Component includes example
/*import {example} from "./example/example";
// Styles include example
import css from '!css-loader!../css/example.css'; // css as object
import '../css/example.css'; //css includes to bundle
<<<<<<< .mine
// ES7 features example
(async function main(){
    console.log("wait...");
    console.log(await example());
})();
// DOM example
window.onload = function () {
    let elem = document.getElementById('dynamic'), i = 0;
    setInterval(() => { elem.innerText = `DOM manipulation example: ${i++}` }, 1000);
};*/