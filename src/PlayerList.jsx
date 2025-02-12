import { Link } from "react-router-dom";

function PlayerList({ players = [], teams = [] }) {
  console.log("📢 Players Data:", players);
  console.log("📢 Teams Data:", teams);

  return (
    <div>
      {players.length > 0 ? (
        players.map(player => {
          console.log(`🔍 Checking Player: ${player.name} | Team ID: ${player.teamId}`);

          // ✅ Find the player's team by matching `teamId`
          const playerTeam = teams.find(team => {
            console.log(`🔎 Checking Team: ${team.name} | ID: ${team.id}`);
            return Number(team.id) === Number(player.teamId); // ✅ Ensures type matches
          });

          return (
            <div key={player.id}>
              <h2>{player.name}</h2>
              <p><strong>Breed:</strong> {player.breed}</p>
              <p><strong>Team:</strong> {playerTeam ? playerTeam.name : "No team assigned"}</p>
              <Link to={`/players/${player.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          );
        })
      ) : (
        <p>No players available.</p>
      )}
    </div>
  );
}

export default PlayerList;
