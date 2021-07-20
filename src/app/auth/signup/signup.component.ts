import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import {Subscription} from 'rxjs'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  uiServiceSubscription: Subscription; 
  showSpinner : boolean = false;
  maxDate : Date; 
  constructor(private authService: AuthService, private uiService : UIService) {
    this.maxDate = new Date() ; 
  }
  ngOnDestroy(): void {
    this.uiServiceSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.maxDate = new Date() ; 
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); 
    this.uiServiceSubscription = this.uiService.loadingStateChanged.subscribe((isloading:boolean)=>{
      this.showSpinner = isloading; 
    })
  }

  onSubmit(form: NgForm){
    this.authService.registerUser({
      email: form.value.email, 
      password: form.value.password
    });
  }

}
