import { AngularFirestore } from "@angular/fire/firestore";
import { map, subscribeOn } from 'rxjs/operators'; 
import { Subject, Subscription } from "rxjs";
import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";

@Injectable()
export class TrainingService{
    
    exerciseChanged = new Subject<Exercise>(); 
    exercisesChanged = new Subject<Exercise[]>() ;
    finishedExercisesChanged = new Subject<Exercise[]>() ;
    fireStoreSubscriptions : Subscription[] = []; 
    private runningExercise? : Exercise;
    private exercises : Exercise[] = []; 
    private availableExercises: Exercise[] = []; 
    constructor(private fireStoreDb: AngularFirestore){}
    
    fetchAvailableExercises(){
    this.fireStoreSubscriptions.push(this.fireStoreDb.collection("availableExercises").snapshotChanges().pipe(map(changes => {
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
       }));
    }

    startExercise(selectedId : string){
        this.runningExercise = this.availableExercises.find((exercise: Exercise) => exercise.id === selectedId) as Exercise;         
        this.exerciseChanged.next({... this.runningExercise}); 
    }

    completeExercise(){        
        this.addDataToFirebase({...this.runningExercise , state:'completed', date: new Date()} as Exercise); 
        this.runningExercise = null as any ; 
        this.exerciseChanged.next(null as any); 
    }

    cancelExercise(progress:number){
        this.addDataToFirebase({...this.runningExercise,
            duration: (<Exercise>this.runningExercise).duration * progress  * 0.01,
            calories: (<Exercise>this.runningExercise).calories * progress * 0.01,
            state:'cancelled', date: new Date()} as Exercise);         
        this.runningExercise = null as any ; 
        this.exerciseChanged.next(null as any); 
    }
    cancelFireStoreSubscriptions(){
        this.fireStoreSubscriptions.forEach(sub => {
            sub.unsubscribe(); 
        });
    }
    getRunningExercise(){
        return {...this.runningExercise}; 
    }

    fetchCompletedOrCancelledExercises(){
        this.fireStoreSubscriptions.push(this.fireStoreDb.collection('finishedExercises').valueChanges().subscribe((actions:any[]) => {
            this.finishedExercisesChanged.next(actions);             
        })); 
    }
    addDataToFirebase(exercise : Exercise){
        this.fireStoreDb.collection("finishedExercises").add(exercise); 
    }
}