import { URL } from 'url';
import { Dailymotion } from './Dailymotion';
import { VideoInfo } from './interfaces/video-info.interface';
import { Vimeo } from './Vimeo';
import { YouTube } from './Youtube';
export namespace Embed {
    const platforms: { [key: string]: any } = { youtube: YouTube, vimeo: Vimeo, dailymotion: Dailymotion };
    export function getInfo(url: string): VideoInfo {
        const parsedUrl = new URL(url);
        const currentPlaforms = Object.keys(platforms);
        let id;
        let source;
        let embedUrl;
        for (let i = 0; i < currentPlaforms.length; i++) {
            id = platforms[currentPlaforms[i]].detect(parsedUrl);
            if (id) {
                source = currentPlaforms[i];
                embedUrl =  platforms[currentPlaforms[i]].getEmbedUrl(id);
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