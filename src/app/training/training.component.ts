import { createElementCssSelector } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  exerciseChangedSubscription : Subscription; 
  ongoingTraining = false;
  constructor(private trainingService: TrainingService) { }
  ngOnDestroy(): void {
    this.exerciseChangedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {
    this.exerciseChangedSubscription =   this.trainingService.exerciseChanged.subscribe((excercise) => {
      if(excercise){
        this.ongoingTraining = true; 
      }
      else {
        this.ongoingTraining = false; 
      }        
    }); 
  }


}
