import { URL } from 'url';
const fetch = require('sync-fetch');
const cheerio = require('cheerio');

export namespace OneDrive {
    const isVideo = function (obj: {resId: string | undefined, authKey: string | undefined, cid: string | undefined}): boolean {
        const fileExtensions = ["3g2","3gp","aaf","asf","avchd","avi","drc","flv","m2v","m4p","m4v","mkv","mng","mov","mp2","mp4","mpe","mpeg","mpg","mpv","mxf","nsv","ogg","ogv","qt","rm","rmvb","roq","svi","vob","webm","wmv","yuv"];

        const resp = fetch(`https://onedrive.live.com/redir.aspx?cid=${obj.cid}&resid=${obj.resId}&authkey=${obj.authKey}`).text();
        const $ = cheerio.load(resp);
        const file = $('meta[property="og:title"]').attr('content');
        if (fileExtensions.includes(file.split('.')[1])) {
            return true;
        }
        
        return false;
    }

    const parseObj = function(parsedUrl: URL): {resId: string, authKey: string, cid: string} {
        const cid = parsedUrl?.searchParams.get('id') ? `0${parsedUrl?.searchParams.get('id')?.split('!')[0]}` : `0${parsedUrl?.searchParams.get('resid')?.split('!')[0]}`;
        const authKey = parsedUrl?.searchParams.get('authkey');
        const resId = parsedUrl?.searchParams.get('id') ? parsedUrl?.searchParams.get('id') : parsedUrl?.searchParams.get('resid');
        
        const driveObj = {cid: '', authKey: '', resId: ''};

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
    
    export function detect(url: URL): string | string[] | undefined | null {
        if (url.href) {
            let parsedUrl;
            if (url.href.indexOf('1drv.ms/v') > -1) {
                const redirectedUrl = fetch(url.href).url;
                parsedUrl = new URL(redirectedUrl);
            } else if (url.href.indexOf('onedrive.live.com') > -1) {
                parsedUrl = url;
            }


            if (!parsedUrl) {
                return null;
            }

            const obj = parseObj(parsedUrl)

            if (!isVideo(obj)) {
                return null;
            }

            return obj?.cid;
        }

        return null;
    }

    export function getIds(url: URL) {
        if (url.href) {
            let parsedUrl;
            if (url.href.indexOf('1drv.ms') > -1) {
                const redirectedUrl = fetch(url.href).url;
                parsedUrl = new URL(redirectedUrl);
            } else if (url.href.indexOf('onedrive.live.com') > -1) {
                parsedUrl = url;
            }

            if (!parsedUrl) {
                return null;
            }

            const driveObj = parseObj(parsedUrl);
            
            return driveObj;
        }

        return null;
    }

    export function getEmbedUrl(obj: {resId: string, authKey: string, cid: string}): string {
        return `//onedrive.live.com/embed?cid=${obj.cid}&resid=${obj.resId}&authkey=${obj.authKey}`;
    }
}