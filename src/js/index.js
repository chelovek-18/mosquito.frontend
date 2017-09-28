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
/**
 * @class Mosquito
 * 
 * 
 * @constructor
 * Define Mosquito variable name (default = 'mosquito'): window[ this.name ].name === this.name
 * Init mosquito (execute init method)
 * @param {?Object} conf                 --> Object configurations (see init method)
 * 
 * @method init                     Init mosquito: configurate and include modules
 * @param {?Object} conf                 --> Object configurations: 'on' and 'off' = on/off methods array and others keys for redefine methods (see lib/init.js)
 * 
 * @method rename                   Rename Mosquito Object variable: let newName = mosqito.rename();
 * @returns {Mosquito}                  <-- Return current Mosquito object into new variable
 * 
 */

window.mosquito = new (
    class Mosquito
    {
        constructor( conf ) {
            this.name = 'mosquito';

            this.init( conf );
        }

        init( conf ) {
            init.apply( this, [ conf, modules ] );
        }

        rename() {
            // Delete old object(s):
            Object.keys( window ).forEach( n => { if ( window[ n ] instanceof Mosquito ) delete window[ n ]; } );
            // Set new name:
            setTimeout( () => { this.name = Object.keys( window ).filter( n => window[ n ] instanceof Mosquito )[ 0 ] }, 0 );
            return this;
        }

    }
)( window.mosquito );