import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  isAuth: boolean = false; 
  authSubscription : Subscription; 
  @Output() sidenavToggled = new EventEmitter<void>()
  constructor(private authService: AuthService) { }
  

  ngOnInit(): void {
    this.authSubscription = this.authService.authChanged.subscribe(authStatus => {
      this.isAuth = authStatus
    })
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();  
  }

  onSidenavToggled(){
    console.log("trying to emit sidenavToggled event emitter"); 
    this.sidenavToggled.emit(); 
  }
}
