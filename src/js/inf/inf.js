export let inf = ( function() {
    return new (
        class inf
        {
            constructor() {
                this.ua = navigator.userAgent;
            }
        }
    );
})();