export interface Exercise {
    id: number, 
    name: string,
   
}

export interface WorkoutSession {
    id:number,
    createdAt: string,
    userId: number, 
    setEntries: SetEntry[]
}

export interface SetEntry {
    id:number, 
    weight: number,
    reps:number,
    createdAt: string,
    workoutSessionId: number, 
    exerciseId: number
}