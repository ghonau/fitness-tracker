import { formatCurrency } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';




import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  uiServiceSubscription : Subscription; 
  showSpinner: boolean = false; 
  loginForm: FormGroup ; 
  
  constructor(private authService: AuthService, private uiService: UIService) { 

  }
  ngOnDestroy(): void {
    this.uiServiceSubscription.unsubscribe() ;
  }

  ngOnInit(): void {
    this.uiServiceSubscription =  this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => {
      this.showSpinner =  isLoading; 
    })
    this.loginForm = new FormGroup({
      email : new FormControl('', {
        validators: [Validators.email, Validators.required]
      }),
      password : new FormControl('', {
        validators : [Validators.required]
      })
    })
  }

  onSubmit(){
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }


}
