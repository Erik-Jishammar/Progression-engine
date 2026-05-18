import { Request, Response } from "express";
import { prisma } from "../services/prisma.js";
import { analyzeExerciseHistory } from "../engine/services/analyzeExercise.js";



export const createExercise = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        // validatie name 
        if(!name || name.trim().length === 0 ){
            return res.status(400).json({error:"Exercise name is required"})
        }


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
                        createdAt: 'desc' 
                    }
                }
            }
        })
        if (!exercise) {
            return res.status(404).json({error: "specific exercise not found"})
        } 
        const analytics = analyzeExerciseHistory(exercise.setEntries);
        
        res.status(200).json({
            ...exercise,
            ...analytics
            
        });
} catch (error){
    console.error("error fetching exercise by ID", error); 
    res.status(500).json({error: "failed to fetch  specific exercise"})
    }
}

export const updateExercise = async(req:Request, res:Response) => {
    try{
        const {id} = req.params; 
        const {name} = req.body;
        if (name === undefined){
            return res.status(400).json({error:"Could not provide exercise name to update"})
        }
        if (name !== undefined){
           // make sure its a string
           if(typeof name !== 'string'){
            return res.status(400).json({error:"Name must be a string"})
           }
           // make sure exercise name is not empty
           if (name.trim().length === 0){
            return res.status(400).json({error:" Updated name cannot be empty"})
           }
        }

        const updatedExercise = await prisma.exercise.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name !== undefined ? name.trim() : undefined
            }
        })
        if (!updatedExercise){
            return res.status(404).json({error: "exercise could not update"})
        }
        res.status(200).json(updatedExercise);
    } catch(error) {
        console.error("error updating exercise"); 
        res.status(500).json({error: "Failed to update exercise"})
    }
}
export const getExerciseAnalysis = async(req:Request, res:Response) => {
   try{ 
    const {id} = req.params; 
    if(!id){
        return res.status(400).json({error:"exerciseId is missing"})
    }
    const exercise = await prisma.exercise.findUnique({
        where: {
            id: Number(id)
        }, include:{
            setEntries: {
                include: {
                    workoutSession:true
                }, orderBy:{
                    createdAt: 'desc'
                }
            }
        }
    })
    if(!exercise){
        return res.status(404).json({error:"exercise not found"})
    }
    // send exercise to engine
    const analyzeExercise = analyzeExerciseHistory(exercise.setEntries);
    res.status(200).json(analyzeExercise);
} catch (error){
    console.error("error fetchning exercise analysis", error);
    res.status(500).json({error:"failed to get exercise analysis"});
}} 