"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embed = void 0;
var url_1 = require("url");
var platforms_1 = require("./platforms");
var Embed = /** @class */ (function () {
    function Embed(driveAPI) {
        this.platforms = { youtube: platforms_1.YouTube, vimeo: platforms_1.Vimeo, dailymotion: platforms_1.Dailymotion, drive: new platforms_1.Drive(driveAPI), oneDrive: platforms_1.OneDrive };
    }
    Embed.prototype.getEmbedHTML = function (source, embedUrl) {
        if (!source || !embedUrl) {
            return null;
        }
        if (source === 'oneDrive') {
            return "<video controls width=\"100%\" height=\"300px\"><source src=\"https:" + embedUrl + "\"/></video>";
        }
        else {
            return "<iframe src=\"https:" + embedUrl + "\" width=\"100%\" height=\"300px\" frameborder=\"0\" scrolling=\"no\" allowfullscreen></iframe>";
        }
    };
    Embed.prototype.getInfo = function (url) {
        var parsedUrl = new url_1.URL(url);
        var currentPlaforms = Object.keys(this.platforms);
        var id;
        var source;
        var embedUrl;
        var oneDriveObj;
        for (var i = 0; i < currentPlaforms.length; i++) {
            id = this.platforms[currentPlaforms[i]].detect(parsedUrl);
            if (id) {
                source = currentPlaforms[i];
                if (source === 'oneDrive') {
                    oneDriveObj = this.platforms[currentPlaforms[i]].getIds(parsedUrl);
                    embedUrl = this.platforms[currentPlaforms[i]].getEmbedUrl(oneDriveObj);
                }
                else {
                    embedUrl = this.platforms[currentPlaforms[i]].getEmbedUrl(id);
                }
                break;
            }
        }
        return {
            id: id,
            source: source,
            url: parsedUrl.href,
            embedUrl: embedUrl,
            html: this.getEmbedHTML(source, embedUrl)
        };
    };
    return Embed;
}());
exports.Embed = Embed;
