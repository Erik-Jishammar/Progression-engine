import { Request, Response } from "express"; 
import { prisma } from "../services/prisma.js";

export const getAllSets = async(req: Request, res:Response ) => {
    try {
        const sets = await prisma.setEntry.findMany({
            include: {
                exercise: true,
                workoutSession: {
                    include: {
                        user: true
                    }
                }
            }
        })
        res.status(200).json(sets); 

    } catch(error) {
        console.error("Error fetching sets", error); 
        res.status(500).json({error: "Failed to fetch sets" })
    }
}

export const createSet = async(req:Request, res:Response) => {
    try {
        const {weight, reps, workoutSessionId, exerciseId } = req.body; 

        const newSet = await prisma.setEntry.create({
            data: {
                weight: Number(weight),
                reps: Number(reps),
                workoutSessionId: Number(workoutSessionId),
                exerciseId: Number(exerciseId)
            },

        });
        res.status(201).json(newSet);
    } catch (error) {
        console.error("error creating set", error);
        res.status(500).json({error:"failed to create set"})
    }
}