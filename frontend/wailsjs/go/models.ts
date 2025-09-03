export namespace entities {
	
	export class User {
	    Username: string;
	    Password: string;
	
	    static createFrom(source: any = {}) {
	        return new User(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Username = source["Username"];
	        this.Password = source["Password"];
	    }
	}

}

export namespace models {
	
	export class LoginResult {
	    ok: boolean;
	    message: string;
	
	    static createFrom(source: any = {}) {
	        return new LoginResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ok = source["ok"];
	        this.message = source["message"];
	    }
	}

}

