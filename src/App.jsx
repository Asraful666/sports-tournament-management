import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tournaments from "./pages/Tournaments";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Matches from "./pages/Matches";
import Venues from "./pages/Venues";
import Referees from "./pages/Referees";
import Results from "./pages/Results";
import Standings from "./pages/Standings";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/tournaments" element={<Tournaments />} />

        <Route path="/teams" element={<Teams />} />

        <Route path="/players" element={<Players />} />

        <Route path="/matches" element={<Matches />} />

        <Route path="/venues" element={<Venues />} />

        <Route path="/referees" element={<Referees />} />

        <Route path="/results" element={<Results />} />

        <Route path="/standings" element={<Standings />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;