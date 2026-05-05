import { TestConnection } from "./api/components/TestConnection"
import { TestSets } from "./api/components/TestSets"

function App(){
  return (
    <div>
      <h1>Progression Engine</h1>
      <TestConnection />
      <TestSets />
    </div>
  )
}
export default App
