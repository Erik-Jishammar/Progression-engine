import { Router } from "express"; 
import { getAllSets, createSet, deleteSet, updateSet, getSetsByExercise } from "../controllers/setController.js" 
import { createWorkout, getAllWorkouts, getWorkoutById, deleteWorkout } from "../controllers/workoutController.js" 
import {createExercise, getAllExercises, getExerciseById, updateExercise, getExerciseAnalysis} from "../controllers/exerciseController.js"
console.log("ROUTES FILE LOADED");

const routes = Router(); 
// sets
routes.get("/set/exercise/test", (req, res) => {

    res.send("WORKS");

});
routes.get("/set/exercise/:exerciseId", getSetsByExercise)
routes.get("/set", getAllSets)
routes.post("/set", createSet)    
routes.delete("/set/:id", deleteSet)
routes.put("/set/:id", updateSet)

console.log("SET EXERCISE ROUTE REGISTERED");
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
routes.get("/exercise/:id/analysis", getExerciseAnalysis)


export default routes; 
