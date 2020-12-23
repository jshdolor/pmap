import Config from '~/Application/Config';
import {format} from 'date-fns';

export default class HrDocument {
    constructor(data = {}) {
        this._name = data.name;
        [this._file] = JSON.parse(data.file);

        this._description = data.description;
       
        this._category = data.category;

        this._date = format(new Date(data.updated_at), Config.date.format);
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get filePath() {
        return '/storage/' + this._file.download_link;
    }

    get fileName() {
        return this._file.original_name;
    }

    get category() {
        return this._category;
    }

    get date() {
        return this._date;
    }

}