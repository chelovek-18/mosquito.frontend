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
        // TODO: Make return result by promise or not return (update localization variable)
        window.onload = function() {
            // var.1 - Get language from html attribute "lang"
            if ( document.children && document.children[ 0 ] && document.children[ 0 ].lang && ( languages[ document.children[ 0 ].lang ] || 'en' ) )
                localization = document.children[ 0 ].lang;
        }
        return lang;
    };

// ------------------------------------- Language -------------------------------------
/**
 * @class Lang
 * Translate string with local json file or online service
 * 
 * 
 * @constructor
 * Set default language by function getLang()
 * Create functions .t() and .$m_t() in String prototype for translate by: "my-string".t( [language] );
 * 
 * @method localization set         Set current language
 * @param {String} lng                  --> Language ('en', 'ru', etc.)
 * 
 * @method localization get         Get current language
 * @returns {String}                    <-- Language ('en', 'ru', etc.)
 * 
 * @method addLocalizations         Add localizations in current json
 * @param {Object} obj                  --> Json { "Hi": "Привет" } <- or -> { "ru": { "Hi": "Привет" } }
 * @param {?String} lng                 --> Language ('en', 'ru', etc.) <- or -> undefined
 * 
 * @method getLocalizations         Get current json localizations
 * @param {?String} lng                 --> Language ('en', 'ru', etc.) <- or -> undefined
 * @returns {Object}                    <-- Json language
 * 
 * @method onlineTranslateOn        On/off online translate + set translate service
 * @param {?Function/Boolean} fn        --> Translate function <- or -> undefined (set default function) <- or -> false/null == online translate off
 * @returns {String}                    <-- Translated string
 * 
 * @method t                        Translate
 * @param {String} string               --> String for translate
 * @param {?String} lng                 --> Language ('en', 'ru', etc.) <- or -> undefined
 * @returns {String}                    <-- Translated string
 * 
 */

export let lang = new (
    class Lang
    {
        constructor() {
            let self = this;

            localization = getLang();
            String.prototype.t = function( lng ) {
                return self.t( this.toString(), lng );
            }
            String.prototype.$m_t = function( lng ) {
                return self.t( this.toString(), lng );
            }
        }

        set localization( lng ) {
            if ( languages[ lng ] || lng == 'en' ) localization = lng;
        }

        get localization() {
            return localization;
        }

        addLocalizations( obj, lng ) {
            if ( lng ) languages[ lng ] = Object.assign( languages[ lng ] ? languages[ lng ] : {}, obj );
            else languages = Object.assign( languages, obj );
        }

        getLocalizations( lng ) {
            return lng ? languages[ lng ] : languages;
        }

        // Translate by online-service or use json files
        // TODO: ActiveXObject and account in microsofttranslator.com
        // TODO: Use mosquito method instead of xhr
        // TODO: Set Azure key
        onlineTranslateOn( fn ) {
            onlineTranslate = fn === undefined ? function( string, lng ) {
                var xhr = new XMLHttpRequest();
                xhr.open( 'GET', location.protocol + '//api.microsofttranslator.com/V2/Ajax.svc/Translate?text=' + string + '&appId=E8DB680F742769E3F9B95BFDB55798C13FEB0E5C&to=' + lng, false );
                xhr.send();
                if ( xhr.status != 200 || /ArgumentOutOfRangeException/.test( xhr.responseText ) ) return string;
                else return xhr.responseText;
            } : fn;
        }

        // Translate
        t( string, lng ) {
            lng = lng || localization;
            if ( onlineTranslate ) return onlineTranslate( string, lng );
            return ( ( lng != 'en' && languages[ lng ] ) ? languages[ lng ][ string ] : null ) || string;
        }
    }
);
/*export let lang = {
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

    onlineTranslateObj: {
        vendor: 'microsoft',
        key: 'E8DB680F742769E3F9B95BFDB55798C13FEB0E5C',
    },

    onlineTranslateApi: new function() {
        this.request = function( url, method = 'GET', isAsync = false ) {
            let xhr = new XMLHttpRequest();
            xhr.open( method, url, isAsync );
            xhr.send();
            return xhr;
            //if ( xhr.status != 200 || /ArgumentOutOfRangeException/.test( xhr.responseText ) ) return string;
            //else return xhr.responseText;
        }
        this.microsoft = function( lng, string, appId ) {
            let url = location.protocol + '//api.microsofttranslator.com/V2/Ajax.svc/Translate?text=' + string + '&appId=' + lang.onlineTranslateObj.key + '&to=' + lng;
            return this.request( url );
        }
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
    // TODO: Use mosquito method instead of xhr
    // TODO: Set Azure key
    t: function( string, lng ) {
        lng = lng || localization;
        if ( onlineTranslate ) {
            //var xhr = window.ActiveXObject ? new  ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();   // new ActiveXObject("Msxml2.XMLHTTP");          
            /*var xhr = new XMLHttpRequest(); //0caf266e805a4704bde3d00679b705ef //6ff4e6bce4834e999061eea101f21074 //E8DB680F742769E3F9B95BFDB55798C13FEB0E5C //dead2627ba694b0abd01788a2bc21bcf
            xhr.open( 'GET', location.protocol + '//api.microsofttranslator.com/V2/Ajax.svc/Translate?text=' + string + '&appId=E8DB680F742769E3F9B95BFDB55798C13FEB0E5C&to=' + lng, false );
            xhr.send();
            if ( xhr.status != 200 || /ArgumentOutOfRangeException/.test( xhr.responseText ) ) return string;
            else return xhr.responseText;*-/
            let xhr = lang.onlineTranslateApi[ lang.onlineTranslateObj.vendor ]( lng, string );
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
}*/