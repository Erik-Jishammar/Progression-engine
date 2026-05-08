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
export const getAllExercises = async (req:Request, res:Response) => {
    try{
        const allExercises = await prisma.exercise.findMany({
            include:{
                setEntries: true,
            },
            orderBy:{
                name: 'asc'
            }
        })
        res.status(200).json(allExercises)
    } catch (error) {
        console.error("error fetching exercises",error)
        res.status(500).json({error: "failed to fetch exercises"})
    }
}   
export const getExerciseById = async (req:Request, res:Response) => {
    try {
        const {id} = req.params; 

        const exercise = await prisma.exercise.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                setEntries: {
                    include: {
                        workoutSession:true
                    },
                    orderBy: {
                        createdAt: 'desc' // latest first
                    }
                }
            }
        })
        if (!exercise) {
            return res.status(404).json({error: "exercise not found"})
        }
        res.status(200).json(exercise)

    } catch (error){
    console.error("error fetching exercise by ID", error); 
    res.status(500).json({error: "failed to fetch  specific exercise"})
    }
}

export const updateExercise = async(req:Request, res:Response) => {
    try{
        const {id} = req.params; 
        const {name} = req.body;

        const updateExercise = await prisma.exercise.update({
            where: {
                id: Number(id)
            },
            data: {
                name: String(name)
            }
        })
        if (!updateExercise){
            return res.status(404).json({error: "exercise could not update"})
        }
        res.status(200).json(updateExercise);
    } catch(error) {
        console.error("error updating exericse"); 
        res.status(500).json({error: "Failed to update set"})
    }
}