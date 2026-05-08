import { Router } from "express"; 
import { getAllSets, createSet, deleteSet } from "../controllers/setController.js" 
import { createWorkout, getAllWorkouts, getWorkoutById } from "../controllers/workoutController.js" 
import {createExercise, getAllExercises, getExerciseById} from "../controllers/exerciseController.js"

const routes = Router(); 
// sets
routes.get("/set", getAllSets)
routes.post("/set", createSet)    
routes.delete("/set/:id", deleteSet)

// workotus 
routes.post("/workout", createWorkout) 
routes.get("/workout", getAllWorkouts)
routes.get("/workout/:id", getWorkoutById)

// exercises
routes.post("/exercise", createExercise)
routes.get("/exercise", getAllExercises)
routes.get("/exercise/:id", getExerciseById)


export default routes; 
