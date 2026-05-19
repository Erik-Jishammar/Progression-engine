// import { useState, useEffect } from "react";
// import { getWorkouts } from "../api/services/workoutService";
// import { getExercises, createExercise } from "../api/services/exerciseService";
// import { getSets } from "../api/services/setService";


// export const CheckServices = () => {
//   const [status, setStatus] = useState({
//     exercises: 'checking...',
//     workouts: 'checking...',
//     sets: 'checking...',
//   });
//   useEffect(() => {
//     const checkAllServices = async () => {

//       try {
//         await getExercises();
//         setStatus(prev => ({ ...prev, exercises: 'Exercises: OK' }));
//       } catch (error) {
//         setStatus(prev => ({ ...prev, exercises: 'Exercises: Failed' }));
//       }

//       try {
//         await getWorkouts();
//         setStatus(prev => ({ ...prev, workouts: 'Workouts: OK' }));
//       } catch (e) {
//         setStatus(prev => ({ ...prev, workouts: 'Workouts: Failed' }));
//       }

//       try {
//         await getSets();
//         setStatus(prev => ({ ...prev, sets: 'Sets: OK' }));
//       } catch (e) {
//         setStatus(prev => ({ ...prev, sets: 'Sets: Failed' }));
//       }
//     };
//     checkAllServices();
//   }, []);

//   const testPost = async () => {
//     try {
//       const result = await createExercise({ name: "test create exercise" + Date.now() })
//       console.log("Successfully created exercise" + result.name)
//     } catch (error) {
//       console.log("Post failed")
//     }

//   }

//   return (
//     <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
//       <h3>Check</h3>
//       <p>{status.exercises}</p>
//       <p>{status.workouts}</p>
//       <p>{status.sets}</p>

//       <button onClick={testPost}>test create exercise</button>
//     </div>
//   );
// };
