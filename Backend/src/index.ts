import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js" 
// import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", routes)


app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
