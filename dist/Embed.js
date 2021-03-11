"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embed = void 0;
var url_1 = require("url");
var Dailymotion_1 = require("./Dailymotion");
var Vimeo_1 = require("./Vimeo");
var Youtube_1 = require("./Youtube");
var Drive_1 = require("./Drive");
var Embed = /** @class */ (function () {
    function Embed(driveAPI) {
        this.platforms = { youtube: Youtube_1.YouTube, vimeo: Vimeo_1.Vimeo, dailymotion: Dailymotion_1.Dailymotion, drive: new Drive_1.Drive(driveAPI) };
    }
    Embed.prototype.getInfo = function (url) {
        var parsedUrl = new url_1.URL(url);
        var currentPlaforms = Object.keys(this.platforms);
        var id;
        var source;
        var embedUrl;
        for (var i = 0; i < currentPlaforms.length; i++) {
            id = this.platforms[currentPlaforms[i]].detect(parsedUrl);
            if (id) {
                source = currentPlaforms[i];
                embedUrl = this.platforms[currentPlaforms[i]].getEmbedUrl(id);
                break;
            }
        }
        return {
            id: id,
            source: source,
            url: parsedUrl.href,
            embedUrl: embedUrl
        };
    };
    return Embed;
}());
exports.Embed = Embed;
