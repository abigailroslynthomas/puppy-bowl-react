import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import DetailsPage from "./DetailsPage";
import AddPlayerForm from "./AddPlayerForm";

const API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-PT-WEB-PT";

function App() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const playersRes = await fetch(`${API_URL}/players`);
        const playersData = await playersRes.json();
        if (playersData.success) setPlayers(playersData.data.players);

        const teamsRes = await fetch(`${API_URL}/teams`);
        const teamsData = await teamsRes.json();
        if (teamsData.success) setTeams(teamsData.data.teams);

        console.log("📢 Players Data in App:", playersData);
        console.log("📢 Teams Data in App:", teamsData);
      } catch (error) {
        console.error("🚨 Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home players={players} teams={teams} />} />
        <Route path="/players/:id" element={<DetailsPage />} />
        <Route path="/add-player" element={<AddPlayerForm setPlayers={setPlayers} />} />
      </Routes>
    </Router>
  );
}

export default App;
