import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';

import UserProfileModel from '~/Application/Models/Profile';
import UserEventModel from '~/Application/Models/Event/UserEvent';

export default class ProfileService {
    static endpoint = '/user';

    static get() {
        let config = {
            headers: {
                Authorization: window.Store.state.session.accessToken,
            },
        };

        return ApiClient.setUrl(this.endpoint + '/profile')
            .get(null, config)
            .then(({ data }) => new UserProfileModel(data))
            .catch((e) => {
                return new ExceptionHandler('Get Profile', e);
            });
    }

    static getRegisteredEvents() {
        let url = this.endpoint + '/event-reservations';
        let config = {
            headers: {
                Authorization: window.Store.state.session.accessToken,
            },
        };

        return ApiClient.setUrl(url)
            .get(null, config)
            .then(({ data }) => data.map((d) => new UserEventModel(d)))
            .catch((e) => {
                throw new ExceptionHandler('getRegisteredEvents', e);
            });
    }

    //todo
    static update(request) {
        return ApiClient.setUrl(this.endpoint + '/profile')
            .withAuth()
            .put(request.toFormData(true))
            .then((data) => data)
            .catch((e) => {
                return new ExceptionHandler('Update Profile', e);
            });
    }

    static updatePassword(request) {
        return ApiClient.setUrl(this.endpoint + '/change-password')
            .withAuth()
            .post(request.toFormData())
            .then((data) => data)
            .catch((e) => {
                return new ExceptionHandler('Update Password', e);
            });
    }

    static updateAvatar(request) {
        const url = this.endpoint + '/update_avatar/';

        let config = {
            headers: {
                Authorization: window.Store.state.session.accessToken,
            },
        };

        return ApiClient.setUrl(url)
            .put(request.toFormData(true), config)
            .then(({ data }) => data)
            .catch((e) => {
                throw new ExceptionHandler('update avatar', e);
            });
    }
}
