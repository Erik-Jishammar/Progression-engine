# Progression Engine

An intelligent fitness tracker that doesn't just log your lifts—it analyzes your data to provide actionable insights into your progression.

## The Core: The Progression Engine
What sets this project apart is the custom "Engine" built into the backend. It transforms raw workout data (weight and reps) into meaningful metrics:
*   **Estimated 1RM (e1RM):** Utilizing the Brzycki formula to estimate strength capacity.
*   **Trend Analysis:** Analyzing volume and strength fluctuations over time.
*   **Progression Scoring:** A point-based system that classifies training phases as *Progressing*, *Stable*, or *Stagnation*.

##  Tech Stack
*   **Frontend:** React with TypeScript (Vite)
*   **Backend:** Node.js & Express with TypeScript
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **API Design:** RESTful architecture following the Controller-Service pattern.

##  Architecture
The project is built with a strict separation of concerns:
*   **Controllers:** Handle incoming requests, validation, and response formatting.
*   **Services:** Manage business logic and direct interaction with the Prisma ORM.
*   **Engine:** An isolated module dedicated to pure mathematics and data analysis, ensuring high testability and reliability.

##  Getting Started
1.  Clone the repository.
2.  Install dependencies in both `/frontend` and `/Backend`:
    ```bash
    npm install
    ```
3.  Configure your environment variables in `/Backend/.env` (e.g., `DATABASE_URL`).
4.  Run database migrations:
    ```bash
    npx prisma migrate dev
    ```
5.  Start the development servers:
    ```bash
    npm run dev
    ```


