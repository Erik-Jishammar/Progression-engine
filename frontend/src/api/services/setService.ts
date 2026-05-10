import {BASE_URL} from "./apiConfig.js"
import type {SetEntry} from "../types"

const baseUrl = `${BASE_URL}/set`

export const getSets = async (): Promise<SetEntry[]> => {
    const res = await fetch(baseUrl);
    if (!res.ok){
        throw new Error("failed to fetch sets")
    }
    return res.json();
}

export const createSet = async (data: 
    { exerciseId: number, weight: number, reps: number, workoutSessionId: number }): Promise<SetEntry> => {
    const res = await fetch(baseUrl,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if(!res.ok){
        throw new Error("failed to create set")
    }
    return res.json();
}

export const deleteSet = async (id: number) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
         })
         if(!res.ok){
            throw new Error("failed to delete set")
         }
         if(res.status === 204){
            return {success: true};
         }
         return res.json();
        };
    
    export const updateSet = async(id:number, 
        data:{
        weight: number, reps:number}): Promise<SetEntry> => {
            const res = await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type":"application/json",
                },
                body: JSON.stringify(data),
            });
            if(!res.ok){
                throw new Error("failed to update set")
            }
            return res.json();
        }
