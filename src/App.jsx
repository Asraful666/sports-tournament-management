import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
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

        {/* Public Pages */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Dashboard Pages */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/tournaments"
          element={
            <Layout>
              <Tournaments />
            </Layout>
          }
        />

        <Route
          path="/teams"
          element={
            <Layout>
              <Teams />
            </Layout>
          }
        />

        <Route
          path="/players"
          element={
            <Layout>
              <Players />
            </Layout>
          }
        />

        <Route
          path="/matches"
          element={
            <Layout>
              <Matches />
            </Layout>
          }
        />

        <Route
          path="/venues"
          element={
            <Layout>
              <Venues />
            </Layout>
          }
        />

        <Route
          path="/referees"
          element={
            <Layout>
              <Referees />
            </Layout>
          }
        />

        <Route
          path="/results"
          element={
            <Layout>
              <Results />
            </Layout>
          }
        />

        <Route
          path="/standings"
          element={
            <Layout>
              <Standings />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;