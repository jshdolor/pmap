
import {propertyValue} from '~/Framework/Helpers';
import { Store } from 'vuex';
class ExceptionHandler {
    
    constructor(type,e, handleError=true) {
        this._type = type
        this._exception = e;

        if(handleError) {
            this.handleError();
        }
    }

    get type() {
        return this._type;
    }

    get exception() {
        return this._exception;
    }

    getErrorMessages() {
        let errors = this._exception.response.data.error;

        for(let i in errors) {
            errors[i] = errors[i][0];
        }

        return errors;
    }

    

    getStatus() {
        return propertyValue(this._exception, 'response.status',500);
    }

    handleError() {

        let customizedBehavior = [422, 404]

        if(customizedBehavior.indexOf(this.getStatus()) > -1) {
            return;
        }

        window.$toasted.error(propertyValue(this.exception,'response.data.message', 'Error'), {
            position: 'bottom-right',
            duration: 2000
        });

        if(this.getStatus() === 401) {
            //unauthorized
            window.Store.dispatch('intent/showLoginModal');
            return;
        } 

        throw this._exception;
    }

}

export default ExceptionHandler;