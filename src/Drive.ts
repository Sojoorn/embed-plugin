import { URL } from "url";

export namespace Drive {
    const regEx = new RegExp(/[-\w]{25,}/);
    export function detect(url: URL): string | string[] | undefined | null {
        if (url.href) {
            if (url.href.indexOf('drive.google.com') > -1) {
                const id = url.href.match(regEx);
                if (Array.isArray(id)) {
                    return id[0];
                }
              }
        }

        return null;
    }

    export function getEmbedUrl(id: string): string {
        return `//drive.google.com/file/d/${id}/preview`;
    } 
}