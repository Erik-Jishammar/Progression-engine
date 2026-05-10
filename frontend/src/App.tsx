import { TestConnection } from "./api/components/TestConnection"
// import { TestSets } from "./api/components/TestSets"
import { CheckServices } from "./api/components/serviceTest"

function App(){
  return (
    <div>
      <h1>Progression Engine</h1>
      <TestConnection />
      {/* <TestSets /> */}
      <CheckServices />
    </div>
  )
}
export default App
