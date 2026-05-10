import {BASE_URL} from "./apiConfig.js"

const baseUrl = `${BASE_URL}/set`

export const getSets = async () => {
    const res = await fetch(baseUrl);
    return res.json();
}

export const createSet = async (data: 
    { exerciseId: number, weight: number, reps: number, workoutSessionId: number }) => {
    const res = await fetch(baseUrl,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export const deleteSet = async (id: number) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
         })
         if(res.status === 204){
            return {sucess: true}
         }
         return res.json();
        };
    
    export const updateSet = async(id:number, 
        data:{
        weight: number, reps:number}) => {
            const res = await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type":"application/json",
                },
                body: JSON.stringify(data),
            });
            return res.json();
        }
