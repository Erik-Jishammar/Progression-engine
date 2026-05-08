import { Router } from "express"; 
import { getAllSets, createSet, deleteSet, updateSet } from "../controllers/setController.js" 
import { createWorkout, getAllWorkouts, getWorkoutById, deleteWorkout } from "../controllers/workoutController.js" 
import {createExercise, getAllExercises, getExerciseById, updateExercise} from "../controllers/exerciseController.js"

const routes = Router(); 
// sets
routes.get("/set", getAllSets)
routes.post("/set", createSet)    
routes.delete("/set/:id", deleteSet)
routes.put("/set/:id", updateSet)

// workotus 
routes.post("/workout", createWorkout) 
routes.get("/workout", getAllWorkouts)
routes.get("/workout/:id", getWorkoutById)
routes.delete("/workout/:id", deleteWorkout)

// exercises
routes.post("/exercise", createExercise)
routes.get("/exercise", getAllExercises)
routes.get("/exercise/:id", getExerciseById)
routes.put("/exercise/:id", updateExercise)


export default routes; 
