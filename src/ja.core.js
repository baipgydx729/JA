/**
 * Created by along on 16/4/25.
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('ja', [], function () {
            return (root.JA = factory());
        });
    } else if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = factory();
        }
        exports.JA = factory();
    }else {
        root.JA = factory();
    }
}(this, function() {
    'use strict';
    var ja = { version : '0.1.0' };
    return ja;
}));
