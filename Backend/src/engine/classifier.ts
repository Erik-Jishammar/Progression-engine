export const classifyScore = (progressionScore:number) => {
    if(progressionScore >= 7 ){
        return "Progressing!!"
    }
    else if (progressionScore >= 4){
        return "Maintaining"
    }
    else {
        return "Stagnating..."
    }
}
