import { ru } from "./ru.json";
console.log( ru );
var
    n = navigator,
    localization = n ? ( n.language || n.browserLanguage || n.userLanguage || n.systemLanguage || 'en' ) : 'en';

export var lang = {
    get localization() {
        return localization;
    }
}