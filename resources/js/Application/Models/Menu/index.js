export default class Menu {
    
    constructor(data = {}) {
        this._id = data.id;
        this._title = data.title;
        this._url = data.url;
        this._children = [];
        this._parentId = data.parent_id;
        this._order = data.order;

        this._target = data.target;
        this._breadcrumbs = [];

        this._icon = data.icon_class;
    }

    get icon() {
        return this._icon;
    }

    set breadcrumbs(value) {
        this._breadcrumbs = value;
    }

    get breadcrumbs() {
        return this._breadcrumbs;
    }

    get title() {
        return this._title;
    }

    get id() {
        return this._id;
    }

    get url() {
        let url = this._url;

        if(this._target === '_blank') {
            url +='?tab=true'
        }

        return url;
    }

    get target() {
        return this._target;
    }

    get order() {
        return this._order;
    }

    get hasChildren() {
        return !!this._children.length;
    }

    get parentId() {
        return this._parentId;
    }

    set children(data) {
        this._children = data;
    }

    get children() {
        return this._children;
    }

    

}