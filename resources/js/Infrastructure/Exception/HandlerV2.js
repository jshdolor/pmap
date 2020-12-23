import Handler from './Handler';
import { propertyValue } from '~/Framework/Helpers';
import axios from 'axios';

export default class HandlerV2 extends Handler {
    getErrorMessages() {
        const {
            response: {
                data: {
                    error: { message: message = {} },
                },
            },
        } = this._exception;

        if (this.getStatus() === 401) {
            window.$toasted.error(message, {
                duration: 2500,
                position: 'bottom-right',
            });
            throw this;
        }

        if (typeof message === 'string') {
            return {
                system: message,
            };
        }

        let errorMessages = {};

        for (let i in message) {
            errorMessages[i] = message[i][0];
        }

        return errorMessages;
    }

    handleError() {
        let customizedBehavior = [422, 404];

        if (customizedBehavior.indexOf(this.getStatus()) > -1) {
            return;
        }

        if (this.getStatus() === 401) {
            //unauthorized
            window.Store.dispatch('intent/showLoginModal');
            return;
        }

        let message = propertyValue(
            this.exception,
            'response.data.message',
            false
        );

        if (!message) {
            message = propertyValue(
                this.exception,
                'response.error.message',
                'An Error Occurred.'
            );
        }

        window.$toasted.error(
            propertyValue(this.exception, 'response.data.message', 'Error'),
            {
                position: 'bottom-right',
                duration: 4000,
            }
        );

        throw this._exception;
    }
}
