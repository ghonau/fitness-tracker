import { Component, OnInit  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  availableExercies : Exercise[]; 
  constructor(private trainingService: TrainingService) { }

  

  ngOnInit(): void {
    this.availableExercies = this.trainingService.getAvailableExercises();
  }

  onTrainingStarted(form : NgForm):void{
    this.trainingService.startExercise(form.value.exercise); 
  }

}
