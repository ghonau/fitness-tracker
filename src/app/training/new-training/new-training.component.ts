import { Component, OnDestroy, OnInit  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    
  availableExercisesSubscription : Subscription;
  
  availableExercises :Exercise[]=[]; 

  constructor(private trainingService: TrainingService) { }
  ngOnDestroy(): void {
    this.availableExercisesSubscription.unsubscribe();
  }

  

  ngOnInit(): void {    
    
    
    this.availableExercisesSubscription =  this.trainingService.exercisesChanged.subscribe((e : Exercise[]) => {
    //   this.availableExercises = [{
    //     id : "FSxAhF7YkCVk0NLZZLSi", 
    //     calories : 180,
    //     duration: 20,
    //     name: "Jugging"
    //   }, 
    //   {
    //     id : "fbDSRDNVED4oaecCo9g7", 
    //     calories : 120,
    //     duration: 15,
    //     name: "Burpees"
    //   }, 
    // ]
  
    // }); 

    this.availableExercises = e;
    
  }); 
  
  this.trainingService.fetchAvailableExercises();

  }
  onTrainingStarted(form : NgForm):void{
    this.trainingService.startExercise(form.value.exercise); 
  }

}
