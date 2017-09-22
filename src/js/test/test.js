var
    oldBrowserMessage = function() {
        var
            e = document.body.appendChild( document.createElement( 'div' ) ),
            style = {
                'position': 'absolute',
                'top': '-100px',
                'left': 0,
                'width': '100%',
                'height': '100px',
                'background': '#00ff00',
                'hide': function() {
                    var self = this;
                    ( function a() {
                        var top = parseInt( self.top ) - 10;
                        if ( top > 110 ) {
                            self.top = top + 'px';
                            setTimeout( a, 50 );
                        }
                    })();
                },
                'show': function() {
                    var self = this;
                    ( function a() {
                        var top = parseInt( self.top ) + 10;
                        if ( top < 0 ) {
                            self.top = top + 'px';
                            setTimeout( a, 50 );
                        }
                    })();
                }
            };

        Object.keys( style ).forEach( function( prop ) { e.style[ prop ] = style[ prop ]; } );
        setTimeout( function() { e.style.show(); }, 1000 );
    };


export var test = ( function() {
    var test = {
        oldBrowserMessage: oldBrowserMessage,

        ua: 7,

        detect: function() {
            if ( false ) return alert( 'ойц!' );
            delete this.detect;
            return this;
        }
    }
    return test.detect();
})();