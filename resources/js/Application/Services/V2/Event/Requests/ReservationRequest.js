import ToFormData from '~/Infrastructure/FormData';

export default class ReservationRequest extends ToFormData {
    constructor(data = {}) {
        super();
        this._participants = data.participants.map((participant) => {
            return {
                name: participant.name,
                email: participant.email,
                contact_number: participant.contactNumber,
                company_name: participant.company,
                company_address: participant.company_address,
                company_tin: participant.company_tin,
                user_id: participant.user_id,
                company_others: participant.company_others,
            };
        });
    }

    set participants(value) {
        this._participants = value;
    }

    get participants() {
        return this._participants;
    }
}
