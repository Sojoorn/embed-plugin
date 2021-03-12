import { URL } from 'url';
import { VideoInfo } from './interfaces';
import { Dailymotion, Vimeo, YouTube, Drive, OneDrive } from './platforms';
export class Embed {
    private platforms: { [key: string]: any };
    constructor(driveAPI?: string | undefined) {
        this.platforms = { youtube: YouTube, vimeo: Vimeo, dailymotion: Dailymotion, drive: new Drive(driveAPI), oneDrive: OneDrive };
    }
    getInfo(url: string): VideoInfo {
        const parsedUrl = new URL(url);
        const currentPlaforms = Object.keys(this.platforms);
        let id;
        let source;
        let embedUrl;
        let oneDriveObj;
        for (let i = 0; i < currentPlaforms.length; i++) {
            id = this.platforms[currentPlaforms[i]].detect(parsedUrl);
            if (id) {
                source = currentPlaforms[i];
                if (source === 'oneDrive') {
                    oneDriveObj =this.platforms[currentPlaforms[i]].getIds(parsedUrl);
                    embedUrl = this.platforms[currentPlaforms[i]].getEmbedUrl(oneDriveObj);
                } else {
                    embedUrl = this.platforms[currentPlaforms[i]].getEmbedUrl(id);
                }
                break;
            }
        }

        return {
            id,
            source,
            url: parsedUrl.href,
            embedUrl
        }
    }
}