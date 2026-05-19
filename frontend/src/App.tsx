// import { CheckServices } from "./components/serviceTest"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Exercises } from "./pages/Exercises";
import "./styles/app.css"

function App() {
  
  return (
    <BrowserRouter>
    <div className="app-container">
      <Navbar />
      <main className="main-content">
      <Routes>

      <Route path="/" element={<Dashboard />}> </Route>

      <Route path="/exercises" element={<Exercises />} />

       </Routes> 
      </main>
      
      <Footer />

      {/* <CheckServices /> */}

    </div>
    </BrowserRouter>
  )
}
export default App
