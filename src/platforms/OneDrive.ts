import { URL } from 'url';
const fetch = require('sync-fetch');

export namespace OneDrive {
    export function detect(url: URL): string | string[] | undefined | null {
        if (url.href) {
            let parsedUrl;
            if (url.href.indexOf('1drv.ms/v') > -1) {
                // return url.searchParams.get('v'); https://1drv.ms/v/s!AkXEMA-H1XcOhgSFiN5DziB0ICS2?e=5qLe8n
                const url = fetch('https://1drv.ms/v/s!AkXEMA-H1XcOhgUEW8iWLz7HqeX5?e=4GdvzD').url;
                parsedUrl = new URL(url);
            } else if (url.href.indexOf('onedrive.live.com')) {
                parsedUrl = url;
            }

            const resId = parsedUrl?.searchParams.get('id') ? parsedUrl?.searchParams.get('id') : parsedUrl?.searchParams.get('resid');

            return resId?.split('!')[0];
        }

        return null;
    }

    export function getIds(url: URL) {
        if (url.href) {
            let parsedUrl;
            if (url.href.indexOf('1drv.ms/v') > -1) {
                const redirectedUrl = fetch(url.href).url;
                parsedUrl = new URL(redirectedUrl);
            } else if (url.href.indexOf('onedrive.live.com')) {
                parsedUrl = url;
            }

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

        return null;
    }

    export function getEmbedUrl(obj: {resId: string, authKey: string, cid: string}): string {
        return `//onedrive.live.com/embed?cid=${obj.cid}&resid=${obj.resId}&authkey=${obj.authKey}`;
    } 
}