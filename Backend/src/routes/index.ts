import { Router } from "express"; 
import { getAllSets, createSet } from "../controllers/setController.js" 
import { createWorkout, getAllWorkouts } from "../controllers/workoutController.js" 

const routes = Router(); 
// sets
routes.get("/set", getAllSets )
routes.post("/set", createSet)    

// workotus 
routes.post("/workout", createWorkout) 
routes.get("/workout", getAllWorkouts)



export default routes; 
