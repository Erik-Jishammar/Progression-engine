import { getExercises, createExercise } from "../api/services/exerciseService";
import { createSet } from "../api/services/setService";
import { createWorkout } from "../api/services/workoutService";
import type { Exercise } from "../api/services/types";


import {useState, useEffect} from "react";

export function Workout() {
    
    const [workoutSessionId, setWorkoutSessionId] = useState<number | null>(null);
    const [newExerciseName, setNewExerciseName] = useState<string>("");
    const [exerciseId, setExerciseId] = useState<number|null>(null);

    const [weight, setWeight] = useState <number | null>(null); 
    const [reps, setReps] = useState <number | null> (null); 
    
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loggedSet, setLoggedSets] = useState<any[]>([])
      
    useEffect(()=> { // get all exericises
        const fetchExercises = async () => {
            try {
                const data = await getExercises();
                setExercises(data);
            } catch (error) {
                console.error("Kunde inte hämta övningarna", error);
            }
        };
        fetchExercises(); 
    }, []); // empty array -> only renders once
    
    
        const handleStartWorkout = async () => {
            try{
                const newSession=  await createWorkout({userId:1})
                setWorkoutSessionId(newSession.id)
            } catch (error){
                console.error("Could not start new session", error); 
            }
        }
        const handleCreateExercise  = async (event: React.SyntheticEvent) => {
            event.preventDefault();
            try{
                const newExercise = await createExercise({name:newExerciseName}); 
                setNewExerciseName("");
                setExercises((prev)=> [...prev, newExercise])
                // choose exercise in drop down
                setExerciseId(newExercise.id)

            } catch(error){
            console.error("Could not create a new exercise name", error);
            }
        }


        const handleLogSet = async (event: React.SyntheticEvent) => {
            event.preventDefault();
            if(!weight || !reps || weight < 0|| reps <1 || !exerciseId || !workoutSessionId){
                return console.error("Fill in all inputs and choose exercise")
            }
            try{
                const data = await createSet({
                    weight: weight,
                    reps: reps, 
                    exerciseId: exerciseId,
                    workoutSessionId: workoutSessionId
                });
                setLoggedSets((prevSets) => [...prevSets, data]);
                
            } catch (error){
                console.error("Could not create a new set", error)
            }
        }

        
        return(
            <div className="form-card">
                <h2> Training logger</h2>
                {!workoutSessionId && (
                <button onClick={handleStartWorkout} >Create a new training session</button>
                )}
                {workoutSessionId && (
                    <>
                        <div>
                            
                            <input type="text" className="input-field" placeholder="exercise name..."  
                            value={newExerciseName} onChange={(event)=> setNewExerciseName(event.target.value)}/>
                            <button type="button" onClick={handleCreateExercise}>create and choose</button>
                        </div>
                        <form className="exercise-form" onSubmit={handleLogSet}>
                            <select className="input" onChange={(event)=> setExerciseId(Number(event.target.value))}>
                                <option value="">Choose exercise</option>
                                {exercises.map((ex)=> (
                                    <option key={ex.id} value={ex.id}>
                                        {ex.name}
                                    </option>
                                ))}
                            </select>
                            <input type="number"  min="0" placeholder="weight in kg" onChange={(event)=> setWeight(Number(event.target.value))} />
                            <input type="number" min="1" placeholder="reps" onChange={(event)=> setReps(Number(event.target.value)) } />
                            <button type="submit">log set</button>
                        </form>
                    </>
                )}
                <div className="log-container">
                    <h3> log</h3>
                    {exercises.map((ex)=> {
                        const setsForThisExercise = loggedSet.filter((set) => set.exerciseId === ex.id);
                        
                        if (setsForThisExercise.length === 0) {
                            return null;
                        }

                        return (
                            <div key={ex.id} className="logged-exercise-group">
                                <h4>{ex.name}</h4>
                                <ul>
                                    {setsForThisExercise.map((set, index) => (
                                        <li key={set.id}>
                                            Set {index + 1}: {set.weight} kg x {set.reps} reps
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                 </div>
            </div>

        )
    }