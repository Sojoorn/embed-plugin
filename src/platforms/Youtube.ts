import { URL } from 'url';

export namespace YouTube {
    export function detect(url: URL): string | string[] | undefined | null {
        if (url.href) {
            if (url.href.indexOf('youtube.com') > -1) {
                return url.searchParams.get('v');
              }
            
              if (url.href.indexOf('youtu.be') > -1) {
                  if (url.pathname) {
                      return url.pathname.split('/')[1];
                  }
              }
        }

        return null;
    }

    export function getEmbedUrl(id: string): string {
        return `//www.youtube.com/embed/${id}`;
    } 
}