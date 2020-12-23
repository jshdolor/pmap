import Navigation from './Navigation';


export default class RouteExporter {

    static _exportPublic() {

        return {
            Navigation : new Navigation()
        };

    }

}