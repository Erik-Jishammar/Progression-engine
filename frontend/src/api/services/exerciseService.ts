import { BASE_URL } from "./apiConfig"; 
import type {Exercise} from "../types"

const baseUrl =`${BASE_URL}/exercise`

export const getExercises = async():Promise<Exercise[]> => {
    const res = await fetch(baseUrl);
    if (!res.ok){
        throw new Error("failed to fetch exercises")
    }

    return res.json();
}

export const createExercise = async (data:{name: String}): Promise<Exercise>  => {
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (!res.ok){
        throw new Error("failed to create exercise")
    }
    return res.json();
}

export const getExerciseById = async(id:number): Promise<Exercise>  => {
    const res = await fetch(`${baseUrl}/${id}`)
    if (!res.ok){
        throw new Error("failed to fetch specific exercise")
    }
    return res.json();
}

export const updateExercise = async(id:number, data: {name:string}): Promise<Exercise>  => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method:"PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    })
    if(!res.ok){
        throw new Error("failed to update exercise")
    }
    return res.json();

} 