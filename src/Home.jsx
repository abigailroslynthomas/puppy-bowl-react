import { useState } from "react";
import PlayerList from "./PlayerList";
import { Link } from "react-router-dom";

function Home({ players, teams }) {
  console.log("📢 Home Component Rendered!");
  console.log("📢 Players in Home:", players);
  console.log("📢 Teams in Home:", teams);

  // ✅ State to track search input
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Filter players based on search
  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Puppy Bowl Players</h1>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search players..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* ✅ Add New Player Button */}
      <Link to="/add-player">
        <button>Add New Player</button>
      </Link>

      {/* ✅ Pass filtered players to PlayerList */}
      <PlayerList players={filteredPlayers} teams={teams} />
    </div>
  );
}

export default Home;
