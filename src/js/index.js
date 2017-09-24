/* Mosquito team 2017 */
'use strict';

// Include your module into project here
import { lang } from "./lang/lang";
import { test } from "./test/test";
const
    modules = { lang: lang, test: test };

// ------------------------------------- Create mosqito -------------------------------------
window.mosquito = new (
    class Mosquito
    {
        // Configurate mosqito and include modules
        constructor( conf ) {
            // Configurate
            if ( conf && typeof conf == 'object' ) {
                // Formatting config object
                Object.assign(
                    conf = conf instanceof Array ? { on: conf } : conf,
                    { on: conf.on || Object.keys( modules ), off: conf.off || [] }
                );
                // Modules on/off
                Object.keys( modules ).forEach( m => {
                    if ( !~conf.on.indexOf( m ) || ~conf.off.indexOf( m ) ) delete modules[ m ];
                });
                // Redefine modules methods with user config
                Object.keys( conf )
                    .filter( m => m != 'on' && m != 'off' )
                    .forEach( m => {
                        if ( modules[ m ] )
                            Object.keys( m ).forEach( ( method, methName ) => modules[ methName ] = method );
                    });
                // Add plugs for uninstall modules
                this.lang = {
                    t: function( string ) { return string; }
                }
            }
            // Include modules
            Object.assign( this, modules );
        }

        // Use: let newName = mosqito.rename();
        rename() {
            // Delete old object:
            Object.keys( window ).forEach( n => { if ( window[ n ] instanceof Mosquito ) delete window[ n ]; } );
            return this;
        }

    }
)( window.mosquito );