import { Request, Response } from "express"; 
import { prisma } from "../services/prisma.js";

export const createWorkout = async (req:Request, res: Response) => {
    try {
        const { userId} = req.body; 

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
        res.status(200).json(workouts); 
    } catch (error) {
        console.error("error fetching all workouts ",error);
        res.status(500).json({error: "failed to fetch workouts"}) 
    }
}

// get -> specifikt pass via id -> req.params.id 
