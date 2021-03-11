"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YouTube = void 0;
var YouTube;
(function (YouTube) {
    function detect(url) {
        if (url.href) {
            if (url.href.indexOf('youtube.com') > -1) {
                return url.searchParams.get('v');
            }
            if (url.href.indexOf('youtu.be') > -1) {
                if (url.pathname) {
                    return url.pathname.split('/')[1];
                }
            }
        }
        return null;
    }
    YouTube.detect = detect;
    function getEmbedUrl(id) {
        return "//www.youtube.com/embed/" + id;
    }
    YouTube.getEmbedUrl = getEmbedUrl;
})(YouTube = exports.YouTube || (exports.YouTube = {}));
