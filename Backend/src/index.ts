import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running")
});

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
})

app.get("/api/set", async (req, res) => {
    try {
        const sets = await prisma.setEntry.findMany({
            include: {
                workoutSession: {
                    include: {
                        user : true // hämta användaren kopplad till session
                    }
                }
            }
        });

        res.json(sets);
    } catch (error) {
        console.error("Error fetching sets:", error);
        res.status(500).json({ error: "Failed to fetch sets" });
    }
})

app.post("/api/set", async (req, res) => {
    try {
        const { exercise, weight, reps, workoutSessionId } = req.body;
        
        
        const newSet = await prisma.setEntry.create({
            data: {
                exercise,
                weight: parseFloat(weight),
                reps: parseInt(reps),
                workoutSessionId: parseInt(workoutSessionId)
            },
        });
        res.json(newSet);
    } catch (error) {
        console.error("Error creating set:", error);
        res.status(500).json({ error: "Failed to create set" });
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
