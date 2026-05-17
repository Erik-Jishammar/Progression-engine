
import { SetData } from "../types.js";

export const calculateSet1rm = (weight: number, reps: number) => {

    if (reps === 1) {
        return weight;
    }

    const result = weight * (1 + (reps / 30));
    return Math.round(result); 

}
export const calculateWorkout1rm = (sets: SetData[]) => {
    if (sets.length === 0 ) {
        return 0;
    }
    let max1rm = 0;
    sets.forEach(set => {
        const currentSet1rm = calculateSet1rm(set.weight, set.reps);
        if(currentSet1rm > max1rm){
            max1rm = currentSet1rm;
        }
    })
    return max1rm;

}
export const calculateVolume = (sets: SetData[]) => {
   
     return sets.reduce((total, set) => {
        return total + (set.weight * set.reps);
         }, 0)
    }

    
