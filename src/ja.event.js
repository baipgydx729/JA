/**
 * Created by along on 16/4/25.
 */
(function (ja) {
    'use strict';
    var event = {
        _eventCallbacks: {},
        _listen: function (type, callback) {
            var callbacks = this._eventCallbacks[type] || (this._eventCallbacks[type] = []);
            callbacks.push(callback);
        },
        _resetEvents: function () { },
        _fire: function (e) {
            var callbacks = this._eventCallbacks[e.type.toLowerCase()] || [];
            if (callbacks.length === 0) {
                return;
            }
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].call(this, e);
            }
        },
        on: function (name, callback) {
            var self = this;
            name.split(/\s+/).forEach(function (item) {
                self._listen(item.toLowerCase(), callback);
            });
            return this;
        },
        off: function (name, callback) {
            var types = name.split(/\s+/);
            var i, j, callbacks, removeIndex;
            for (i = 0; i < types.length; i++) {
                callbacks = this._eventCallbacks[types[i].toLowerCase()];
                if (callbacks) {
                    removeIndex = null;
                    for (j = 0; j < callbacks.length; j++) {
                        if (callbacks[j] == callback) {
                            removeIndex = j;
                        }
                    }
                    if (removeIndex !== null) {
                        callbacks.splice(removeIndex, 1);
                    }
                }
            }
        },
        fire: function (type, params) {
            this._fire({type: type, params: params});
            return this;
        }
    };

    ja.event = event;
})(JA);