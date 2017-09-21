// 1. Import all languages without "en"
import * as ru from "./ru.json";

var
    // 2. Create languages object
    languages = { ru: ru },
    n = navigator,
    d = document,
    localization = 'en',
    onlineTranslate = false,
    // Get language:
    getLang = function() {
        // var.2 - Get language from window.navigator
        var lang = n ? ( n.browserLanguage || n.language || n.userLanguage || n.systemLanguage ) : null;
        // var.3 - Get language from url ( 'en.domain.com' or 'domain.com/en/' )
        if ( !lang || ( !languages[ lang ] && lang != 'en' ) ) {
            Object.keys( languages ).forEach( function( lng ) {
                if ( [ '.', '/', '$/' ].some( function( postf ) { return ( new RegExp( '/' + lng + postf ) ).test( location.href ) } ) )
                    lang = lng;
            });
        }
        // var.4 - Get language from domain zone
        if ( !lang || ( !languages[ lang ] && lang != 'en' ) ) lang = location.host.split( ':' )[ 0 ].split( '.' ).pop();
        if ( ( !languages[ lang ] && lang != 'en' ) ) lang = 'en';
        window.onload = function() {
            // var.1 - Get language from html attribute "lang"
            if ( document.children && document.children[ 0 ] && document.children[ 0 ].lang && ( languages[ document.children[ 0 ].lang ] || 'en' ) )
                localization = document.children[ 0 ].lang;
        }
        return lang;
    };

export var lang = {
    set localization( lng ) {
        if ( languages[ lng ] || lng == 'en' ) localization = lng;
    },

    get localization() {
        return localization;
    },

    onlineTranslate: function( on ) {
        onlineTranslate = on;
    },

    addLocalizations: function( obj, loc ) {
        if ( loc ) languages[ loc ] = Object.assign( languages[ loc ], obj );
        else languages = Object.assign( languages, obj );
    },

    init: ( function() {
        localization = getLang();
        String.prototype.lang = function( lng ) {
            lng = lng || localization;
            if ( onlineTranslate ) {
                var xhr = new XMLHttpRequest();
                xhr.open( 'GET', location.protocol + '//api.microsofttranslator.com/V2/Ajax.svc/Translate?text=' + this.toString() + '&appId=E8DB680F742769E3F9B95BFDB55798C13FEB0E5C&to=' + lng, false );
                xhr.send();
                if ( xhr.status != 200 ) return this.toString();
                else return xhr.responseText;
            }
            return ( lng != 'en' ? languages[ lng ][ this.toString() ] : null ) || this.toString();
        }
        setTimeout( function() { delete lang.init; }, 0 );
    })()
}