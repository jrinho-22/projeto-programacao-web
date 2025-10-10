
export class UserSession {
    static _instance: UserSession | null = null;
    _logged = false

    constructor() {
        if (!UserSession._instance) {
            UserSession._instance = this;
        }

        return UserSession._instance;
    }

    get isUserLogged() {
        return this._logged
    }

    set isUserLogged(isLogged: boolean) {
        this._logged = isLogged
    }
}

const instance = new UserSession()

export default instance