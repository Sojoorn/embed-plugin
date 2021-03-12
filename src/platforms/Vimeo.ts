import { URL } from 'url';

export namespace Vimeo {
    const regexMatch = new RegExp(/^(?:\/video|\/channels\/[\w-]+|\/groups\/[\w-]+\/videos)?\/(\d+)/);

    export function detect(url: URL): string | string[] | undefined | null {
        if (url.pathname) {
            const match = regexMatch.exec(url.pathname);
            if (url.href.indexOf('vimeo.com') > -1 && match) {
                return match[1];
            }
        }

        return null;
    }

    export function getEmbedUrl(id: string): string {
        return `//player.vimeo.com/video/${id}`;
    } 
}