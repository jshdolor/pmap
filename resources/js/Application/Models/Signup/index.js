import Profile from '~/Application/Models/Profile';

export default class Signup {

    constructor(data={}){
        this._access_token = data.token;
        this._user = data.user;
        this._token_type = data.tokenType;
        this._info = new Profile(data.user.info);
    }

    get access_token() {
        return this._access_token
    }

    get user() {
        return this._user
    }

    get token_type() {
        return this._token_type;
    }

    get info() {
        return this._info;
    }


}