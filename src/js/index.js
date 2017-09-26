/* Mosquito team 2017 */
'use strict';

import { init } from "./lib/init";

// Include your module into project here
import { lang } from "./lang/lang";
import { test } from "./test/test";
const
    modules = {
        lang: lang,
        test: test
    };

// ------------------------------------- Create mosqito -------------------------------------
window.mosquito = new (
    class Mosquito
    {
        constructor( conf ) {
            this.name = 'mosquito';

            this.init( conf );
        }

        // Configurate mosqito and include modules
        init( conf ) {
            init.apply( this, [ conf, modules ] );
        }

        // Use: let newName = mosqito.rename();
        rename() {
            // Delete old object(s):
            Object.keys( window ).forEach( n => { if ( window[ n ] instanceof Mosquito ) delete window[ n ]; } );
            // Set new name:
            setTimeout( () => { this.name = Object.keys( window ).filter( n => window[ n ] instanceof Mosquito )[ 0 ] }, 0 );
            return this;
        }

    }
)( window.mosquito );