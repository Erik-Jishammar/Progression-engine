export const trendAnalyze = (performanceHistory:number[]) => {
    // guard -> atleast 2 values
    if(performanceHistory.length < 2){
        return "Insufficent data";
     }
    const latest = performanceHistory[0]; 
    const previous = performanceHistory[1];
    // guard -> division 0
    if(previous === 0 ){
        return "invalid data"
    }
    const change = (latest - previous) / previous; 
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