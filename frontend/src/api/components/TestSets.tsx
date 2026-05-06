import { useState, useEffect } from "react";
import { getSets, createSet } from "../client";

export const TestSets = () => {
    const [sets, setSets] = useState<any[]>([]);


    const fetchSets = async () => {
        const data = await getSets();
        setSets(data);
    };

    useEffect(() => {
        fetchSets();
    }, []);

    const handleAddSet = async () => {
        await createSet({
            exercise: "deadlift",
            weight: 180,
            reps: 10,
            workoutSessionId: 1
        });
        fetchSets();
    };

    return (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
            <h3>Test Sets</h3>
            <button onClick={handleAddSet}>Add test set</button>

            <div style={{ marginTop: "10px" }}>
                <strong>Sparade set i databasen:</strong>
                <pre>{JSON.stringify(sets, null, 2)}</pre>
            </div>
        </div>
    );
};
