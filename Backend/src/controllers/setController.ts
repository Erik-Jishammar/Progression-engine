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
       
        // validation

        const weightNum = Number(weight);
        if(isNaN(weightNum) || weightNum <= 0){
            return res.status(400).json({error: "Weight must be a positive number"});
        }
        const repsNum = Number(reps);
        if(isNaN(repsNum) || repsNum <= 0){
            return res.status(400).json({error: "Reps must be a atleast 1"})
        }
        if(!workoutSessionId || !exerciseId) {
            return res.status(400).json({error: "Missing execiseId or workoutSessionId"});
        }

        const newSet = await prisma.setEntry.create({
            data: {
                weight: weightNum,
                reps: repsNum,
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

        await prisma.setEntry.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(204).send();

    } catch (error){
        console.error("error deleteing set", error);
        res.status(500).json({error:"Failed to delete set"})
    }
}

export const updateSet = async(req:Request, res:Response) => {
    try{
        const {id} = req.params;
        const {weight, reps} = req.body;
        // validation 
        if (weight === undefined && reps === undefined){
            return res.status(400).json({error: "failed to provide data to update"})
        }
        if(weight !== undefined){
            const weightNum = Number(weight);
            if(isNaN(weightNum) || weightNum <= 0 ){
                return res.status(400).json({error: "(UPDATE) weight must be a positive number"})
            }
        }
        if (reps !== undefined){
            const repsNum = Number(reps); 
            if(isNaN(repsNum) || repsNum <= 0 ){
                return res.status(400).json({error:"(UPDATE) reps must be atleast 1"})
            }
        }


        const updatedSet = await prisma.setEntry.update({
            where:{
                id: Number(id)
               },
             data: {
                // only update fields that are provided, prisma ignores undefined
                weight: weight !== undefined ? Number(weight) : undefined,
                reps: reps !== undefined ? Number(reps) : undefined
               }
        })
        if(!updatedSet){
            return res.status(404).json({error:"set could not update"});
            
        }
        res.status(200).json(updatedSet);
    } catch (error) {
        console.error("error updating set", error);
        res.status(500).json({error: "Failed to update set"})
    }
}