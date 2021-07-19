import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs'; 


@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild(MatSort) sort: MatSort; 
  @ViewChild(MatPaginator) paginator : MatPaginator;
  displayedColumns = ['name', 'date', 'duration',  'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  finishedExercisesChangedSubscription :Subscription; 
  constructor(private trainingService: TrainingService) { }
  ngOnDestroy(): void {
    this.finishedExercisesChangedSubscription.unsubscribe(); 
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort; 
    this.dataSource.paginator  = this.paginator ; 
  }
  
  
  ngOnInit(): void {    
      this.finishedExercisesChangedSubscription  =  this.trainingService.finishedExercisesChanged.subscribe(exercise => {
        this.dataSource.data = exercise; 
      }) ;
      this.trainingService.fetchCompletedOrCancelledExercises(); 
    };    

    doFilter(filterValue : string){
        this.dataSource.filter = filterValue.trim().toLowerCase(); 
    }
  }


