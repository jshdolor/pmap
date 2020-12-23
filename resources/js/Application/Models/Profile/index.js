import { format } from 'date-fns';
import Config from '~/Application/Config';

export default class Profile {

    constructor(data={}){

        this._id = data.user_id;

        this._firstName = data.first_name;
        this._middleName = data.middle_name;
        this._lastName = data.last_name;
        this._contactNumber = data.contact_number;
        this._companyId = data.company_id;

        this._otherCompany = data.other_company;

        this._address1 = data.address1;
        this._address2 = data.address2;

        this._barangayCode = data.barangay_code;
        this._cityCode = data.city_code;
        this._provinceCode = data.province_code;
        this._regionCode = data.region_code;

        this._memberSince = data.member_since;
        this._email = data.email;
        this._isIncomplete = data.is_incomplete;
        this._fullName = data.full_name;
        this._memberStatus = data.member_status;
        this._wordMemberStatus = data.word_member_status;
        
        this._memberType = data.member_type? data.member_type.name : '';

        this.avatar = null;

    }

    set avatar(value) {
        this._avatar = value;
    }

    get avatar() {
        return this._avatar ? this._avatar:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png';
    }

    
    get id() {
        return this._id;
    }

    get otherCompany() {
        return this._otherCompany;
    }

    get firstName() {
        return this._firstName;
    }

    get middleName() {
        return this._middleName;
    }

    get lastName() {
        return this._lastName;
    }

    get contactNumber() {
        return this._contactNumber;
    }

    get companyId() {
        return this._companyId;
    }

    get address1() {
        return this._address1;
    }

    get address2() {
        return this._address2;
    }

    get barangayCode() {
        return this._barangayCode;
    }

    get cityCode() {
        return this._cityCode;
    }

    get provinceCode() {
        return this._provinceCode;
    }

    get regionCode() {
        return this._regionCode;
    }

    get memberSince() {

        if(this._memberSince) {
            return format(new Date(this._memberSince), Config.date.format);
        }

        return this._memberSince;
    }

    get email() {
        return this._email;
    }

    get isIncomplete() {
        return this._isIncomplete;
    }

    get fullName() {
        return this._fullName;
    }

    get isMember() {
        return !!this._memberStatus;
    }

    get memberStatus() {
        return this._wordMemberStatus;
    }

    get memberType() {
        return this._memberType;
    }

}