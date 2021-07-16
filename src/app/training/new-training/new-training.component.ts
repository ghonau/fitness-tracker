import { Component, OnDestroy, OnInit  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    
  availableExercisesSubscription : Subscription;
  
  availableExercises :Exercise[]; 

  constructor(private trainingService: TrainingService) { }
  ngOnDestroy(): void {
    this.availableExercisesSubscription.unsubscribe();
  }

  

  ngOnInit(): void {    
    
    this.trainingService.fetchAvailableExercises();
    this.availableExercisesSubscription =  this.trainingService.exercisesChanged.subscribe((e : Exercise[]) => {
        this.availableExercises = e; 
    }); 

    
  }

  onTrainingStarted(form : NgForm):void{
    this.trainingService.startExercise(form.value.exercise); 
  }

}
