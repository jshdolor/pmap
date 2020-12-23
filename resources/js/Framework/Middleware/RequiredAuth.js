import Cookies from '~/Infrastructure/Cookies';

class RequiredAuth {

    static handle(to, from, next) {

        if (Cookies.get('p-at')) {

            next();

        } else {

            next({ name: 'home-route' });

        }


    }


}

export default RequiredAuth;