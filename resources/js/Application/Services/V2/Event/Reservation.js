import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';
import EventReservationModel from '~/Application/Models/EventReservation';
export default class EventReservationService {
    static endpoint = '/events';

    static handle(request, event_id) {
        const url = `${this.endpoint}/${event_id}/reservations`;

        let config = {
            headers: {
                Authorization: window.Store.state.session.accessToken,
            },
        };

        return ApiClient.setUrl(url)
            .post({ participants: request.participants }, config)
            .then(({ data }) => new EventReservationModel(data))
            .catch((e) => {
                return new ExceptionHandler('register', e, false);
            });
    }

    static getEventRegistrationByCode(request) {
        const url = `/event-reservations`;

        return ApiClient.setUrl(url)
            .get(request)
            .then(({ data }) => new EventReservationModel(data))
            .catch((e) => {
                return new ExceptionHandler('register', e, false);
            });
    }

    static getQrCode(code) {
        const url = `/event-reservations/qr-code`;

        const request = {
            code,
            size: 100,
        };

        return ApiClient.setUrl(url)
            .get(request)
            .then((data) => data)
            .catch((e) => {
                return new ExceptionHandler('qrcode', e, false);
            });
    }

    static cancelReservation(request) {
        const url = `/event-reservations/cancel`;

        return ApiClient.setUrl(url)
            .post(request)
            .then((data) => data)
            .catch((e) => {
                return new ExceptionHandler('Cancel Reservation', e, false);
            });
    }
}
