
import { Subject } from 'rxjs'; 
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";


export class AuthService{
    authChanged = new Subject<boolean>(); 
    private user : User; 
    registerUser(authData: AuthData){
        this.user = {
            email: authData.email,
            userId : Math.round(Math.random() * 10000).toString() 
        }; 
        this.authChanged.next(true); 
    }

    login(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authChanged.next(true); 
    }

logout(){
        this.user = null as any;
        this.authChanged.next(false) ; 
}

    getUser(){
        return { ...this.user };
    }
    isAuth(){
        return this.user != null ; 
    }
}
