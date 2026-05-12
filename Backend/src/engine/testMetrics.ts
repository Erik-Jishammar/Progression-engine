import {calculateSet1rm, calculateWorkout1rm, calculateVolume} from "./metrics.js"


console.log("Test 1RM:" , calculateSet1rm(100, 10)) // 133 -> works as expected

console.log("Test 1RM set:",calculateSet1rm(120,1) ) // reps = 1 should return the weight which is accurate


// mock data for one session 

const mockData =  [
    {weight: 100, reps: 10 }, 
    {weight: 120, reps: 5 }, 
    {weight: 100, reps: 1 }, 
]

// test workout 1RM 
console.log("test workout max 1RM:", calculateWorkout1rm(mockData)) // 140


// test calculate total volume

console.log("total volume: ", calculateVolume(mockData)) // 1000 + 600 +100 = 1700 