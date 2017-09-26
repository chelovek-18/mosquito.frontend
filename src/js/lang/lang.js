// 1. Import all languages without "en"
import * as ru from "./ru.json";

let
    // 2. Create languages object
    languages = {
        ru: ru
    },
    n = navigator,
    d = document,
    localization = 'en',
    onlineTranslate = false,
    // Get language:
    getLang = function() {
        // var.2 - Get language from window.navigator
        let lang = n ? ( n.browserLanguage || n.language || n.userLanguage || n.systemLanguage ) : null;
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

// ------------------------------------- Language -------------------------------------
export let lang = {
    // Get/set current language ('en', 'ru', etc.)
    set localization( lng ) {
        if ( languages[ lng ] || lng == 'en' ) localization = lng;
    },

    get localization() {
        return localization;
    },

    // Translate by online-service or use json files
    onlineTranslate: function( on ) {
        onlineTranslate = on === undefined ? true : on;
    },

    // Add/get json localizations object
    addLocalizations: function( obj, lng ) {
        if ( lng ) languages[ lng ] = Object.assign( languages[ lng ] ? languages[ lng ] : {}, obj );
        else languages = Object.assign( languages, obj );
    },

    getLocalizations: function( lng ) {
        return lng ? languages[ lng ] : languages;
    },

    // Translate
    // TODO: ActiveXObject and account in microsofttranslator.com
    t: function( string, lng ) {
        lng = lng || localization;
        if ( onlineTranslate ) {
            var xhr = new XMLHttpRequest();
            xhr.open( 'GET', location.protocol + '//api.microsofttranslator.com/V2/Ajax.svc/Translate?text=' + string + '&appId=E8DB680F742769E3F9B95BFDB55798C13FEB0E5C&to=' + lng, false );
            xhr.send();
            if ( xhr.status != 200 || /ArgumentOutOfRangeException/.test( xhr.responseText ) ) return string;
            else return xhr.responseText;
        }
        return ( ( lng != 'en' && languages[ lng ] ) ? languages[ lng ][ string ] : null ) || string;
    },

    init: ( function() {
        localization = getLang();
        String.prototype.t = function( lng ) {
            return window[ lang.parent.name ].lang.t( this.toString(), lng );
        }
        String.prototype.$m_t = function( lng ) {
            return window[ lang.parent.name ].lang.t( this.toString(), lng );
        }
        setTimeout( function() { delete lang.init; }, 0 );
    })()
}