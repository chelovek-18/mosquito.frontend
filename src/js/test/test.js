export var test = ( function() {
    var test = {
        ua: 7,
        detect: function() {
            if ( false ) return alert( 'ойц!' );
            delete this.test;
            return this;
        }
    }
    return test.detect();
})();