/* Mosquito team 2017 */
'use strict';

// Include your module into project here
import { lang } from "./lang/lang";
import { test } from "./test/test";
const
    subj = { lang: lang, test: test };

/*window.mosqito = new (
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
)( window.mosqito );*/

// ------------------------------------- Create mosqito -------------------------------------
window.mosqito = new (
    class Mosquito
    {
        // Configurated mosqito and include modules
        constructor( conf = {} ) {
            /*if ( param && param instanceof Array )
                Object.keys( subj ).forEach( ( m ) => { if ( !~param.indexOf( m ) ) delete subj[ m ]; } );
            Object.assign( this, subj );*/
        }

        // For rename: let newName = mosqito.rename();
        rename() {
            Object.keys( window ).forEach( n => window[ n ] instanceof Mosquito && delete window[ n ] );
            return new Mosquito;
        }
    }
)( window.mosqito );