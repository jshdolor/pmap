import Config from '~/Application/Config';

export default class Officer {
    
    constructor(data = {}) {
        this._id = data.id;
        this._name = data.name;
        this._position = data.position;
        this._batch = data.batch;
        this._image = data.image;
    }

    get id() {
        return this._id;
    }

    get name () {
        return this._name;
    }

    get position() {
        return this._position;
    }

    get batch() {
        return this._batch;
    }

    get image() {
        return this._image ? '/storage/'+this._image: Config.fallbackImage;
    }
}