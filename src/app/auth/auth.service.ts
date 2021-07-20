
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs'; 
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable() 
export class AuthService{
    
    authChanged = new Subject<boolean>(); 
    loggedIn: boolean = false;     
    
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth, 
        private trainingService: TrainingService,        
        private uiService: UIService
        ){}
    
    initAuthListener(){
        this.afAuth.authState.subscribe((user) => {
            if(user){
                this.loggedIn = true; 
                this.authChanged.next(true); 
                this.router.navigate(['/training']);                
            }else{
                this.trainingService.cancelFireStoreSubscriptions();  
                this.loggedIn = false ; 
                this.authChanged.next(false); 
                this.router.navigate(['/login']); 
            }
        })
    }
    
    registerUser(authData: AuthData){
        this.uiService.loadingStateChanged.next(true);        
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
            this.uiService.loadingStateChanged.next(false); 
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false); 
            this.uiService.showSnackbar(error.message , '' , 3000);             
            this.loggedIn = false; 
        });                
    }

    login(authData: AuthData){
    this.uiService.loadingStateChanged.next(true); 
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
        console.log(result);                 
        this.uiService.loadingStateChanged.next(false); 
    })
    .catch(error => {        
        this.uiService.showSnackbar(error.message, '' , 3000);         
        this.uiService.loadingStateChanged.next(false); 
    }); 
      
    }

    logout(){
        this.afAuth.signOut(); 
        }    
    isAuth(){
        return this.loggedIn;
        ; 
    }    
}
