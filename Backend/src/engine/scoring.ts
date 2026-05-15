// import {}

export const scoringProgression = (oneRepMaxTrend:string , volumeTrend:string) => {
    let repMaxScore = 0; 
    // 1RM scoring
    if (oneRepMaxTrend === "Increasing") {
        repMaxScore = 10; 
    }
    if (oneRepMaxTrend === "Stable"){
        repMaxScore = 5; 
    }
    // volume scoring
    let volumeScore = 0; 
    if(volumeTrend === "Increasing"){
        volumeScore = 10; 
    }
    if( volumeTrend === "Stable"){
        volumeScore = 5; 
    }// 1RM weighs more
    const finalScore = (repMaxScore * 0.7) + (volumeScore * 0.3);
    return  Math.round(finalScore); 

}