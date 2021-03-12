"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneDrive = void 0;
var url_1 = require("url");
var fetch = require('sync-fetch');
var cheerio = require('cheerio');
var OneDrive;
(function (OneDrive) {
    var isVideo = function (obj) {
        var fileExtensions = ["3g2", "3gp", "aaf", "asf", "avchd", "avi", "drc", "flv", "m2v", "m4p", "m4v", "mkv", "mng", "mov", "mp2", "mp4", "mpe", "mpeg", "mpg", "mpv", "mxf", "nsv", "ogg", "ogv", "qt", "rm", "rmvb", "roq", "svi", "vob", "webm", "wmv", "yuv"];
        var resp = fetch("https://onedrive.live.com/redir.aspx?cid=" + obj.cid + "&resid=" + obj.resId + "&authkey=" + obj.authKey).text();
        var $ = cheerio.load(resp);
        var file = $('meta[property="og:title"]').attr('content');
        var fileSplit = file.split('.');
        if (fileSplit.length > 1 && fileExtensions.includes(fileSplit[fileSplit.length - 1])) {
            return true;
        }
        return false;
    };
    var parseObj = function (parsedUrl) {
        var _a, _b;
        var cid = (parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.searchParams.get('id')) ? "0" + ((_a = parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.searchParams.get('id')) === null || _a === void 0 ? void 0 : _a.split('!')[0]) : "0" + ((_b = parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.searchParams.get('resid')) === null || _b === void 0 ? void 0 : _b.split('!')[0]);
        var authKey = parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.searchParams.get('authkey');
        var resId = (parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.searchParams.get('id')) ? parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.searchParams.get('id') : parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.searchParams.get('resid');
        var driveObj = { cid: '', authKey: '', resId: '' };
        if (cid) {
            driveObj.cid = encodeURIComponent(cid);
        }
        if (authKey) {
            driveObj.authKey = authKey.replace('!', '%21');
        }
        if (resId) {
            driveObj.resId = resId.replace('!', '%21');
        }
        return driveObj;
    };
    function detect(url) {
        if (url.href) {
            var parsedUrl = void 0;
            if (url.href.indexOf('1drv.ms/v') > -1) {
                var redirectedUrl = fetch(url.href).url;
                parsedUrl = new url_1.URL(redirectedUrl);
            }
            else if (url.href.indexOf('onedrive.live.com') > -1) {
                parsedUrl = url;
            }
            if (!parsedUrl) {
                return null;
            }
            var obj = parseObj(parsedUrl);
            if (!isVideo(obj)) {
                return null;
            }
            return obj === null || obj === void 0 ? void 0 : obj.cid;
        }
        return null;
    }
    OneDrive.detect = detect;
    function getIds(url) {
        if (url.href) {
            var parsedUrl = void 0;
            if (url.href.indexOf('1drv.ms') > -1) {
                var redirectedUrl = fetch(url.href).url;
                parsedUrl = new url_1.URL(redirectedUrl);
            }
            else if (url.href.indexOf('onedrive.live.com') > -1) {
                parsedUrl = url;
            }
            if (!parsedUrl) {
                return null;
            }
            var driveObj = parseObj(parsedUrl);
            return driveObj;
        }
        return null;
    }
    OneDrive.getIds = getIds;
    function getEmbedUrl(obj) {
        return "//onedrive.live.com/embed?cid=" + obj.cid + "&resid=" + obj.resId + "&authkey=" + obj.authKey;
    }
    OneDrive.getEmbedUrl = getEmbedUrl;
})(OneDrive = exports.OneDrive || (exports.OneDrive = {}));
