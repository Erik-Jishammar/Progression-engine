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
        }
        res.status(200).json(workout); 
    }catch (error){
        console.error("error fetching workout by id", error); 
        res.status(500).json({error:"failed to fetch workout"})
    }
}

export const deleteWorkout = async(req:Request, res:Response) => {
    try{
        const {id} = req.params; 

        const deleteWorkout = await prisma.workoutSession.delete({
            where: {
                id: Number(id)
            }
        })
        if(!deleteWorkout){
            return res.status(404).json({error:"Workout not found"})
        }
        res.status(204).json(deleteWorkout);
    } catch (error) {
        console.error("error deleting workout", error);
        res.status(500).json({error: "Failed to delete workout"})
    }
}