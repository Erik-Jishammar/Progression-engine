import { BASE_URL } from "./apiConfig";

const baseUrl = `${BASE_URL}/workout`; 

export const getWorkouts = async() => {
    
    const res = await fetch(baseUrl);
    if (!res.ok){
        throw new Error("failed to fetch workout history");

    }
    return res.json();
}

export const createWorkout = async(data:{userId:number}) => {
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if(!res.ok){
        throw new Error("failed to create workout session")
    }
    return res.json();
}

export const deleteWorkout = async(id:number) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
    if(!res.ok){
        throw new Error("failed to delete workout session")
    }
    if(res.status === 204){
        return {success:true}
    }
    return res.json();
}
    
export const getWorkoutById = async(id:number) => {
    const res = await fetch(`${baseUrl}/${id}`);
    if(!res.ok){
        throw new Error("failed to fetch specific workout session")
    }
    return res.json();
}
