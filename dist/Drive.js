"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drive = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
var fetch = require('sync-fetch');
var Drive = /** @class */ (function () {
    function Drive(driveAPI) {
        this.regEx = new RegExp(/[-\w]{25,}/);
        this.apiKey = driveAPI;
    }
    Drive.prototype.isVideo = function (id) {
        var request = fetch("https://www.googleapis.com/drive/v3/files/" + id + "?key=" + this.apiKey).json();
        if (request && Object.prototype.hasOwnProperty.call(request, 'id') && request.mimeType.includes('video')) {
            return true;
        }
        return false;
    };
    Drive.prototype.detect = function (url) {
        if (!this.apiKey) {
            return null;
        }
        if (url.href) {
            if (url.href.indexOf('drive.google.com') > -1) {
                var id = url.href.match(this.regEx);
                if (Array.isArray(id)) {
                    var isVideo = this.isVideo(id[0]);
                    if (isVideo) {
                        return id[0];
                    }
                }
            }
        }
        return null;
    };
    Drive.prototype.getEmbedUrl = function (id) {
        return "//drive.google.com/file/d/" + id + "/preview";
    };
    return Drive;
}());
exports.Drive = Drive;
