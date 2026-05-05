import { useEffect, useState } from "react";
import { getHealth } from "../client";
// verifiera att backend svarar när vi kör frontend och backend

export const TestConnection = () => {
    const [status, setStatus] = useState<string>("loading...");
    useEffect(() => {
        getHealth()
            .then((data) => setStatus(data.status))
            .catch(() => setStatus("error"));
    }, []);
    return <div>Backend status: { status } </div>
}