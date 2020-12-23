import Config from '~/Application/Config';
import {format} from 'date-fns';

export default class Webinar {
    constructor(data = {}) {
        
        this._id = data.id;
        this._title = data.title;
        this._filename = data.filename;
        this._slug = data.slug;
        this._date = data.date;
        this._speaker = data.speaker;
        this._info = data.info;
        this._video = data.video;

        this._presentationLink = data.presentation_link;

        this._videoThumbnail = this._video;

        
    }

    get id() {
        return this._id;
    }

    get presentationLink() {
        return this._presentationLink;
    }

    get filename() {
        return this._filename;
    }

    get title() {
        return this._title;
    }
    
    get slug() {
        return this._slug;
    }
    
    get date() {
        return format(new Date(this._date), Config.date.format);
    }
    
    set date(value) {
        this._date = value;
    }
    
    get year() {
        return format(new Date(this._date), "Y");
    }
    
    get speaker() {
        return this._speaker;
    }

    get video() {
        return this._video;
    }

    get info() {
        return this._info;
    }
    
    get videoThumbnail() {
        let div = document.createElement("div");
        div.innerHTML = this._video.trim();
        let videoSrc = div.querySelector("iframe").getAttribute("src");
        const videoId = videoSrc.split("/").reverse()[0];
        if(videoId) {
            return `https://img.youtube.com/vi/${videoId}/0.jpg`;
        }

        return ``;

    }

    get path() {
        return { 
            name: 'webinar-route', 
            params: { slug: this.slug }
        };
    }

}