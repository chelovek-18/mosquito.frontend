/* Mosquito team 2017 */
'use strict';

import { lang } from "./lang/lang";
import { test } from "./test/test";
const
    subj = { 'lang': lang, 'test': test };

window.mosqito = new (
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
)( window.mosqito );