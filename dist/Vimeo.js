"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vimeo = void 0;
var Vimeo;
(function (Vimeo) {
    var regexMatch = new RegExp(/^(?:\/video|\/channels\/[\w-]+|\/groups\/[\w-]+\/videos)?\/(\d+)/);
    function detect(url) {
        if (url.pathname) {
            var match = regexMatch.exec(url.pathname);
            if (url.href.indexOf('vimeo.com') > -1 && match) {
                return match[1];
            }
        }
        return null;
    }
    Vimeo.detect = detect;
    function getEmbedUrl(id) {
        return "//player.vimeo.com/video/" + id;
    }
    Vimeo.getEmbedUrl = getEmbedUrl;
})(Vimeo = exports.Vimeo || (exports.Vimeo = {}));
