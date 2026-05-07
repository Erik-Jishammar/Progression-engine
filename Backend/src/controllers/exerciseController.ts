import { Request, Response } from "express";
import { prisma } from "../services/prisma.js";


export const createExercise = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const newExercise = await prisma.exercise.create({
            data: {
                name: String(name)
            }
    })
         res.status(201).json(newExercise)
    } catch (error) {
        console.error("error creating exercise", error); 
        res.status(500).json({error:"failed to create new exercise"});
        
    }
}