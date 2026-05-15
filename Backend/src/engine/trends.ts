export const trendAnalyze = (performanceHistory:number[]) => {
    // guard 2 
    if(performanceHistory.length < 2){
        return "Insufficent data";
     }
    const latest = performanceHistory[0]; 
    const previousSessions = performanceHistory.slice(1,5);
    const previousAverage = previousSessions.reduce((sum, val)=> sum + val, 0) / previousSessions.length;
    // guard -> division 0
    if(previousAverage === 0 ){
        return "invalid data"
    }
    const change = (latest - previousAverage) / previousAverage; 
    const threshold = 0.02; 

    if (change > threshold){
        return "Increasing";
    }
    if (change < -threshold){
        return "Declining"; 
    }
    else {
        return "Stable";
    }

}