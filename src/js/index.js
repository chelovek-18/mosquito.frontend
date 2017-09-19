/* Mosquito team 2017 */
'use strict';
// Component includes example
import {example} from "./example/example";
// Styles include example
import css from '!css-loader!../css/example.css'; // css as object
import '../css/example.css'; //css includes to bundle
// Library export
(function main() {
    return window.$msq = {
        example : example
    }
})();