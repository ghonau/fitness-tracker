import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  constructor(private matSnackbar: MatSnackBar) { }
  loadingStateChanged = new Subject<boolean>(); 

  showSnackbar(message: string, action: string, duration:number){
    this.matSnackbar.open(
      message,
      action,
      {
        duration : duration
      }); 
  }
}
