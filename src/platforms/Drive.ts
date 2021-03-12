import { URL } from "url";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('sync-fetch')

export class Drive {

    regEx: RegExp;
    apiKey: string | undefined;

    constructor(driveAPI?: string | undefined) {
        this.regEx = new RegExp(/[-\w]{25,}/);
        this.apiKey = driveAPI;
    }

    private isVideo(id: string): boolean {
        const request = fetch(`https://www.googleapis.com/drive/v3/files/${id}?key=${this.apiKey}`).json();
        if (request && Object.prototype.hasOwnProperty.call(request, 'id') && request.mimeType.includes('video')) {
            return true;
        }
        return false;
    }

    detect(url: URL): string | string[] | undefined | null {
        if (!this.apiKey) {
            return null;
        }
        if (url.href) {
            if (url.href.indexOf('drive.google.com') > -1) {
                const id = url.href.match(this.regEx);
                if (Array.isArray(id)) {
                    const isVideo = this.isVideo(id[0]);
                    if (isVideo) {
                        return id[0];
                    }
                }
            }
        }

        return null;
    }

    getEmbedUrl(id: string): string {
        return `//drive.google.com/file/d/${id}/preview`;
    } 
}