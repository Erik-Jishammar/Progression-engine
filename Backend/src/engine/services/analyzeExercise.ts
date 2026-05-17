import { SetEntry } from "@prisma/client";
import { calculateWorkout1rm, calculateVolume } from "../metrics.js";
import { trendAnalyze } from "../trends.js";
import {scoringProgression} from "../scoring.js"
import {classifyScore} from "../classifier.js"

export const analyzeExerciseHistory = (setEntries: SetEntry[]) => {
        // group by session 
        const grouped: Record<number, SetEntry[]> = {};
        for(const set of setEntries){
            const sessionId = set.workoutSessionId;
            if(!grouped[sessionId]){
                grouped[sessionId] = []; 
            }
            grouped[sessionId].push(set);
        }
        // transform to sortable array (newest session first)
        const sessions = Object.entries(grouped)
            .map(([sessionId, sets]) => ({
                sessionId: Number(sessionId),
                sets
            }))
            .sort((a, b) => b.sessionId - a.sessionId);

        // calculate metrics per session (1rm & volume)
        const oneRepMaxHistory = sessions.map(s => calculateWorkout1rm(s.sets));
        const volumeHistory = sessions.map(s => calculateVolume(s.sets));

        // trend analysis (index 0 is latest, index 1 is previous)
        const oneRepMaxTrend = trendAnalyze(oneRepMaxHistory);
        const volumeTrend = trendAnalyze(volumeHistory);
        const progressionScore = scoringProgression(oneRepMaxTrend, volumeTrend);
        const status = classifyScore(progressionScore);

        // calculate overall estimated 1rm (current state)
        const estimated1RM = calculateWorkout1rm(setEntries);
        
        return {
            oneRepMaxHistory,
            volumeHistory,
            oneRepMaxTrend,
            volumeTrend,
            estimated1RM,
            progressionScore,
            status
        
        }
}
