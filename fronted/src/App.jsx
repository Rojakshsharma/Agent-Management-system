import { Routes, Route } from "react-router-dom";
import SignupFrom from "./components/SignupForm"
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<SignupFrom/>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App
