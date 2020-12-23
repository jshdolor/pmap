
import ToFormData from '~/Infrastructure/FormData';

export default class ProfileUpdateRequest extends ToFormData {

    constructor(data = {
    }) {
        super();

        this._first_name = data.firstName;
        this._middle_name = data.middleName;
        this._last_name = data.lastName;
        this._contact_number = data.contactNumber;
        this._company_id = data.company;
        this._address1 = data.address1;
        this._address2 = data.address2;
        this._barangay_code = data.barangay_code;
        this._city_code = data.city_code;
        this._province_code = data.province_code;
        this._region_code = data.region_code;
        this._email = data.email;
        this._other_company = data.otherCompany

    }

}
