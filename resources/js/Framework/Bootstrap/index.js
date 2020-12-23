import App from "~/Framework/Components/Application";
import Store from '~/Framework/Store';
import Router from '~/Framework/Router';
import Directives from '~/Framework/Components/Directives';

class Bootstrap {

    init() {

        Directives.register();
        window.Store = Store;
        window.pageCallDone = {}

        let app = new Vue({
            router : (new Router().boot()),
            render: h => {
                return h(App);
            },
            store : Store,
        })

        app.$mount("#app");

        
    }

}

export default Bootstrap;
