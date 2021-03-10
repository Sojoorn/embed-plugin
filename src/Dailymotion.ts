import { URL } from 'url';

export namespace Dailymotion {
    export function detect(url: URL): string | string[] | undefined | null {
        if (url.pathname) {
            if (url.href.indexOf('dailymotion.com') > -1) {
                return url.pathname.split('/')[2].split('_')[0]
            }
            
            if (url.href === 'dai.ly') {
                return url.pathname.split('/')[1]
            }
        }
        
        return null
    }

    export function getEmbedUrl(id: string): string {
        return `//www.dailymotion.com/embed/video/${id}`;
    } 
}