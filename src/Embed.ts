import { URL } from 'url';
import { Dailymotion } from './Dailymotion';
import { VideoInfo } from './interfaces/video-info.interface';
import { Vimeo } from './Vimeo';
import { YouTube } from './Youtube';
import { Drive } from './Drive';
export class Embed {
    private platforms: { [key: string]: any };
    constructor(driveAPI?: string | undefined) {
        this.platforms = { youtube: YouTube, vimeo: Vimeo, dailymotion: Dailymotion, drive: new Drive(driveAPI) };
    }
    getInfo(url: string): VideoInfo {
        const parsedUrl = new URL(url);
        const currentPlaforms = Object.keys(this.platforms);
        let id;
        let source;
        let embedUrl;
        for (let i = 0; i < currentPlaforms.length; i++) {
            id = this.platforms[currentPlaforms[i]].detect(parsedUrl);
            if (id) {
                source = currentPlaforms[i];
                embedUrl =  this.platforms[currentPlaforms[i]].getEmbedUrl(id);
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