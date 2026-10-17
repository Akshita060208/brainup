
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scoreboard from "./pages/Scoreboard";
import Footer from "./components/Footer"

import CardSlider from "./CardSlider";
import Header from "./components/Header";
import ProfileSection from "./components/Popup";

import "./App.css";

// Stroop game files
import StroopHome from "./games/stroop/StroopHome";
import StroopGame from "./games/stroop/StroopGame";

// Memory game
import MemoryGame from "./games/memory/Memorygame";

// Math game page (placeholder)
import MathSprint from "./games/maths/MathSprint";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">

        {/* Profile Icon Popup Fixed */}
        <ProfileSection />

        <Header />

        <Routes>
          {/* Home */}
          <Route path="/" element={<CardSlider />} />

          {/* Scoreboard FIXED - moved inside Routes */}
          <Route path="/scoreboard" element={<Scoreboard />} />

          {/* Stroop */}
          <Route path="/stroop" element={<StroopHome />} />
          <Route path="/stroop/play" element={<StroopGame />} />

          {/* Memory */}
          <Route path="/memory/play" element={<MemoryGame />} />

          {/* Math */}
          <Route path="/maths/play" element={<MathSprint />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
