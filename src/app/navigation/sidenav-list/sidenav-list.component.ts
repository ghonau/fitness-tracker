import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  isAuth : boolean = false ;
  authSubscription : Subscription; 
  @Output() sidenavClosing = new EventEmitter<void>(); 

  constructor(private authServce: AuthService) { }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe(); 
  }

  ngOnInit(): void {
    this.authSubscription = this.authServce.authChanged.subscribe(authStatus => {
      this.isAuth = authStatus;      
    })   
  }
  
  onSidenavClosing(){
    this.sidenavClosing.emit(); 
  }
}
