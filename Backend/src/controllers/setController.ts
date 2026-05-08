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

export const deleteSet = async(req:Request, res:Response) => {
    try{
        const {id} = req.params; 

        const deleteSet = await prisma.setEntry.delete({
            where: {
                id: Number(id)
            }
        })
        if(!deleteSet){
            return res.status(404).json({error: "set not found"})
        }
        res.status(200).json(deleteSet)

    } catch (error){
        console.error("error deleteing set", error);
        res.status(500).json({error:"Failed to delete set"})
    }
}

export const updateSet = async(req:Request, res:Response) => {
    try{
        const {id} = req.params;
        const {weight, reps} = req.body;

        const updateSet = await prisma.setEntry.update({
            where:{
                id: Number(id)
               },
               data: {
                weight: Number(weight),
                reps: Number(reps)
               }
        })
        if(!updateSet){
            return res.status(404).json({error:"set could not update"});
            
        }
        res.status(200).json(updateSet);
    } catch (error) {
        console.error("error updating set", error);
        res.status(500).json({error: "Failed to update set"})
    }
}