/**
 * Created by along on 16/4/25.
 */
(function (ja) {
    'use strict';
    var u = navigator.userAgent, plug = navigator.plugins;

    var toFixedVersion = function(ver, floatLength){
        ver= (""+ver).replace(/_/g,".");
        floatLength = floatLength || 1;
        ver = String(ver).split(".");
        ver = ver[0] + "." + (ver[1] || "0");
        ver = Number(ver).toFixed(floatLength);
        return ver;
    };

    var browser = {
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
        getUserAgent: function () {
            return u;
        },
        chrome: !!u.match(/Chrome\/([\d.]+)/),
        firefox: !!u.match(/Firefox\/([\d.]+)/),
        ie: !!u.match(/Msie\/([\d.]+)/),
        opera: !!u.match(/Opera\/([\d.]+)/),
        safari: !!u.match(/Version\/([\d.]+).*Safari/),
        adobeAir: !!u.match(/Adobeair\/([\d.]+)/),
        plugins: {
            flash: (function () {
                //var ver = "none";
                var ver = 0;
                if (plug && plug.length) {
                    var flash = plug['Shockwave Flash'];
                    if (flash && flash.description) {
                        ver = toFixedVersion(flash.description.match(/\b(\d+)\.\d+\b/)[1], 1) || ver;
                    }
                } else {
                    var startVer = 13;
                    while (startVer--) {
                        try {
                            new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + startVer);
                            ver = toFixedVersion(startVer);
                            break;
                        } catch (e) {
                        }
                    }
                }
                return ver;
            })()
        }
    };
    ja.browser = browser;
})(JA);