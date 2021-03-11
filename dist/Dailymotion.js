"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dailymotion = void 0;
var Dailymotion;
(function (Dailymotion) {
    function detect(url) {
        if (url.pathname) {
            if (url.href.indexOf('dailymotion.com') > -1) {
                return url.pathname.split('/')[2].split('_')[0];
            }
            if (url.href === 'dai.ly') {
                return url.pathname.split('/')[1];
            }
        }
        return null;
    }
    Dailymotion.detect = detect;
    function getEmbedUrl(id) {
        return "//www.dailymotion.com/embed/video/" + id;
    }
    Dailymotion.getEmbedUrl = getEmbedUrl;
})(Dailymotion = exports.Dailymotion || (exports.Dailymotion = {}));
