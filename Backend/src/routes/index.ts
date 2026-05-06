import { Router } from "express"; 
import { getAllSets, createSet } from "../controllers/setController.js" 

const routes = Router(); 

 routes.get("/", getAllSets )
 routes.post("/", createSet)    



export default routes; 
