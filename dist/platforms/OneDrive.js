"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneDrive = void 0;
var url_1 = require("url");
var fetch = require('sync-fetch');
var OneDrive;
(function (OneDrive) {
    function detect(url) {
        if (url.href) {
            var parsedUrl = void 0;
            if (url.href.indexOf('1drv.ms/v') > -1) {
                // return url.searchParams.get('v'); https://1drv.ms/v/s!AkXEMA-H1XcOhgSFiN5DziB0ICS2?e=5qLe8n
                var url_2 = fetch('https://1drv.ms/v/s!AkXEMA-H1XcOhgUEW8iWLz7HqeX5?e=4GdvzD').url;
                parsedUrl = new url_1.URL(url_2);
            }
            else if (url.href.indexOf('onedrive.live.com')) {
                parsedUrl = url;
            }
            var resId = (parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.searchParams.get('id')) ? parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.searchParams.get('id') : parsedUrl === null || parsedUrl === void 0 ? void 0 : parsedUrl.searchParams.get('resid');
            return resId === null || resId === void 0 ? void 0 : resId.split('!')[0];
        }
        return null;
    }
    OneDrive.detect = detect;
    function getIds(url) {
        var _a, _b;
        if (url.href) {
            var parsedUrl = void 0;
            if (url.href.indexOf('1drv.ms/v') > -1) {
                var redirectedUrl = fetch(url.href).url;
                parsedUrl = new url_1.URL(redirectedUrl);
            }
            else if (url.href.indexOf('onedrive.live.com')) {
                parsedUrl = url;
            }
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
        }
        return null;
    }
    OneDrive.getIds = getIds;
    function getEmbedUrl(obj) {
        return "//onedrive.live.com/embed?cid=" + obj.cid + "&resid=" + obj.resId + "&authkey=" + obj.authKey;
    }
    OneDrive.getEmbedUrl = getEmbedUrl;
})(OneDrive = exports.OneDrive || (exports.OneDrive = {}));
