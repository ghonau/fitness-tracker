import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training-component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  
  
  progress = 0; 
  timer:any; 
  
  constructor(private dialog:MatDialog, private trainingService: TrainingService) { }
  private step = this.trainingService.getRunningExercise().duration / 100 * 1000; 

  startOrResumeTimer() {
    this.timer = setInterval(() =>{
      this.progress =  this.progress + 5;       
      if(this.progress >= 100){
        this.trainingService.completeExercise(); 
        clearInterval(this.timer); 
      }      
    }, this.step);    
  }

  ngOnInit(): void {
    this.startOrResumeTimer();   
  }

  onStop(){
    clearInterval(this.timer); 
    const dialogRef =  this.dialog.open(StopTrainingComponent, { 
      data:{
            progress:this.progress
      }
    });
    dialogRef.afterClosed().subscribe((dialogResult )=>{
        if(dialogResult){
          this.trainingService.cancelExercise(this.progress);
        }else{
          this.startOrResumeTimer(); 
        }
    })
  }
}
