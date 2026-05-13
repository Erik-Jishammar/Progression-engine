import { Request, Response } from "express"; 
import { prisma } from "../services/prisma.js";
import { calculateWorkout1rm, calculateVolume} from "../engine/metrics.js"

export const createWorkout = async (req:Request, res: Response) => {
    try {
        const { userId} = req.body; 
        if (!userId){
            return res.status(400).json({error:"userId is missing"})
        }
        
        const newWorkout = await prisma.workoutSession.create({
            data: {
                userId: Number(userId),
            }
        }); 
        res.status(201).json(newWorkout)

    } catch (error) {
        console.error("error creating workout ",error);
        res.status(500).json({error: "failed to create workout"}) 
    }
}

export const getAllWorkouts = async(req:Request, res:Response) => {
    try {
        const workouts = await prisma.workoutSession.findMany({
            include:{
                user: true,
                setEntries: true, 

            }
        }) 
        // enrich session with calculated metrics, 1rm + volume
        const workoutWithMetrics = workouts.map(workout => {
            const workoutMax = calculateWorkout1rm(workout.setEntries);
            const totalVolume = calculateVolume(workout.setEntries); 
            return {
                ...workout, workoutMax, totalVolume
            };
        })

        res.status(200).json(workoutWithMetrics); 
        
    } catch (error) {
        console.error("error fetching all workouts ",error);
        res.status(500).json({error: "failed to fetch workouts"}) 
    }
}

export const getWorkoutById = async(req:Request, res: Response) => {
    try{
        const {id} = req.params; 
        const workout = await prisma.workoutSession.findUnique({
            where :{
                id: Number(id)
            }, include: {
                setEntries:true,
                user:true
            }
        })
        if(!workout){
            return res.status(404).json({ error: "workout not found"})
        } // cal session-specific metrics using engine before returning res
         const workoutMax = calculateWorkout1rm(workout.setEntries);
         const totalVolume = calculateVolume(workout.setEntries);  

        res.status(200).json({...workout, workoutMax, totalVolume}); 
    }catch (error){
        console.error("error fetching workout by id", error); 
        res.status(500).json({error:"failed to fetch workout"})
    }
}

export const deleteWorkout = async(req:Request, res:Response) => {
    try{
        const {id} = req.params; 

        await prisma.workoutSession.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(204).send();
        
    } catch (error) {
        console.error("error deleting workout", error);
        res.status(500).json({error: "Failed to delete workout"})
    }
}