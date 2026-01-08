import { useState } from "react"
import Dashboard from "./pages/Dashboard"
import AccessModal from "./modals/AccessModal"

function App() {
  const [unlocked, setUnlocked] = useState(false)

  return (
    <div className="min-h-screen bg-base-300">
      {!unlocked && <AccessModal onSuccess={() => setUnlocked(true)} />}
      <Dashboard locked={!unlocked} />
    </div>
  )
}

export default App
