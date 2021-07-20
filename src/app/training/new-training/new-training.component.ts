import { Component, OnDestroy, OnInit  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    
  availableExercisesSubscription : Subscription;
  uiServiceSubscription : Subscription; 
  showSpinner: boolean = true; 
  availableExercises :Exercise[]=[]; 

  constructor(private trainingService: TrainingService, private uiService : UIService) { }
  ngOnDestroy(): void {
    this.availableExercisesSubscription.unsubscribe();
    this.uiServiceSubscription.unsubscribe() ;
  }

  fetchExercises(){
    this.trainingService.fetchAvailableExercises();
  }

  ngOnInit(): void {       
    
    this.uiServiceSubscription = this.uiService.loadingStateChanged.subscribe((isLoading) => {
      this.showSpinner = isLoading ; 
    }); 

    this.availableExercisesSubscription =  this.trainingService.exercisesChanged.subscribe((e : Exercise[]) => {
    this.availableExercises = e;
    
  }); 
  
  this.fetchExercises();

  }
  onTrainingStarted(form : NgForm):void{
    this.trainingService.startExercise(form.value.exercise); 
  }

}
