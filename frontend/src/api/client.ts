export const getHealth = async () => {
    const res = await fetch("http://localhost:3000/api/health");
    return res.json();

}

export const getSets = async () => {
    const res = await fetch("http://localhost:3000/api/set");
    return res.json();
}

export const createSet = async (data: { exercise: string, weight: number, reps: number, workoutSessionId: number }) => {
    const res = await fetch("http://localhost:3000/api/set", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}