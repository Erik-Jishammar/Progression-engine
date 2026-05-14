import { Request, Response } from "express";
import { prisma } from "../services/prisma.js";
import {calculateWorkout1rm, calculateVolume} from "../engine/metrics.js"
import { trendAnalyze } from "../engine/trends.js";
import { SetEntry } from "@prisma/client";

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
                        createdAt: 'desc' // latest first
                    }
                }
            }
        })
        if (!exercise) {
            return res.status(404).json({error: "specific exercise not found"})
        } 
        const setEntries = exercise.setEntries; 
        // group by session 
        const grouped: Record<number, SetEntry[]> = {};
        for(const set of setEntries){
            const sessionId = set.workoutSessionId;
            if(!grouped[sessionId]){
                grouped[sessionId] = []; 
            }
            grouped[sessionId].push(set);
        }
        // transform to sortable array (newest session first)
        const sessions = Object.entries(grouped)
            .map(([sessionId, sets]) => ({
                sessionId: Number(sessionId),
                sets
            }))
            .sort((a, b) => b.sessionId - a.sessionId);

        // calculate metrics per session (1rm & volume)
        const oneRepMaxHistory = sessions.map(s => calculateWorkout1rm(s.sets));
        const volumeHistory = sessions.map(s => calculateVolume(s.sets));

        // trend analysis (index 0 is latest, index 1 is previous)
        const oneRepMaxTrend = trendAnalyze(oneRepMaxHistory);
        const volumeTrend = trendAnalyze(volumeHistory);

        // calculate overall estimated 1rm (current state)
        const estimated1RM = calculateWorkout1rm(exercise.setEntries);
        res.status(200).json({
            ...exercise,
            estimated1RM,
            oneRepMaxHistory,
            volumeHistory,
            oneRepMaxTrend,
            volumeTrend
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