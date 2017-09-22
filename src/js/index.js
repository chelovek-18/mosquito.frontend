/* Mosquito team 2017 */
'use strict';

import { lang } from "./lang/lang";
import { test } from "./test/test";
var
    subj = { lang: lang, test: test };

window.subj = subj;

window.mosqito = new (
    function Mosquito( param ) {
        param = param || {};

        //this.oldBrowserMessage = typeof param.oldBrowserMessage == 'function' ? param.oldBrowserMessage : oldBrowserMessage;
        if ( !Object.assign ) return subj.test.oldBrowserMessage();

        //Object.assign( this, param );
        
        this.rename = function() {
            Object.keys( window ).forEach( function( n ) { if ( window[ n ] instanceof Mosquito ) delete window[ n ]; } );
            return new Mosquito;
        };
    }
)( window.mosqito );

/*window.mosquito = new (
    function() {}()
)( window.mosqito ); ''.repeat - проверка */

/*window.mosqito = new (
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
)( window.mosqito );*/