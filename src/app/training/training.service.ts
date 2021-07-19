import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators'; 
import { Observable, Subject } from "rxjs";
import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";

@Injectable()
export class TrainingService{
    
    exerciseChanged = new Subject<Exercise>(); 
    exercisesChanged = new Subject<Exercise[]>() ;
    private runningExercise? : Exercise;
    private exercises : Exercise[] = []; 
    private availableExercises: Exercise[] = []; 
    constructor(private fireStoreDb: AngularFirestore){}
    
    fetchAvailableExercises(){
         this.fireStoreDb.collection("availableExercises").snapshotChanges().pipe(map(changes => {
            return changes.map(changedDoc => { 
              const doc = changedDoc.payload.doc.data() as Exercise; 
               return {
                 id:changedDoc.payload.doc.id,
                 name: doc.name, 
                 duration: doc.duration,
                 calories: doc.calories
             }}); 
       })).subscribe((exercises: Exercise[])=>{
           this.availableExercises = exercises;           
           this.exercisesChanged.next([...this.availableExercises]);
       })
    }

    startExercise(selectedId : string){
        this.runningExercise = this.availableExercises.find((exercise: Exercise) => exercise.id === selectedId) as Exercise;         
        this.exerciseChanged.next({... this.runningExercise}); 
    }

    completeExercise(){
        this.exercises.push({...this.runningExercise , state:'completed', date: new Date()} as Exercise); 
        this.runningExercise = null as any ; 
        this.exerciseChanged.next(null as any); 
    }

    cancelExercise(progress:number){
        this.exercises.push({...this.runningExercise,
             duration: (<Exercise>this.runningExercise).duration * progress  * 0.01,
             calories: (<Exercise>this.runningExercise).calories * progress * 0.01,
             state:'cancelled', date: new Date()} as Exercise); 
        this.runningExercise = null as any ; 
        this.exerciseChanged.next(null as any); 
    }

    getRunningExercise(){
        return {...this.runningExercise}; 
    }

    getCompletedOrCancelledExercises(){
        return this.exercises.slice() ;
    }
}