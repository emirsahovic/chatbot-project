import { Route, Routes } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Results from "./components/Results";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Chatbot />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
