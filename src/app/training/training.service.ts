import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";

export class TrainingService{
    
    exerciseChanged = new Subject<Exercise>(); 
    private runningExercise? : Exercise;
    private exercises : Exercise[] = []; 

    private availableExercises: Exercise[] = [
        {id:'crunches', name:"Crunches", duration:30 , calories:8},
        {id:'touch-toes', name:"Touch Toes", duration:180 , calories:15},
        {id:'side-lunges', name:"Side Lunges", duration:120 , calories:18},
        {id:'burpees', name:"Burpees", duration:60 , calories:8},
        {id:'jugging', name:"Jugging", duration:60 , calories:8},
    ];   
    getAvailableExercises(){
        return this.availableExercises.slice(); 
    }

    startExercise(selectedId : string){
        this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId) as Exercise;         
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