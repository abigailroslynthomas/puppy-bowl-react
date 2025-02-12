import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-PT-WEB-PT";

function DetailsPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlayerDetails() {
      try {
        const response = await fetch(`${API_URL}/players/${id}`);
        const data = await response.json();
        if (data.success) {
          setPlayer(data.data.player);
        } else {
          setError("Player not found.");
        }
      } catch (error) {
        console.error("🚨 Error fetching player details:", error);
        setError("Failed to load player details.");
      }
    }
    fetchPlayerDetails();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!player) return <p>Loading...</p>;

  return (
    <div>
      <h2>{player.name}</h2>
      <p><strong>Breed:</strong> {player.breed}</p>
      <p><strong>Status:</strong> {player.status}</p>
      <img src={player.imageUrl} alt={player.name} width="200" />
    </div>
  );
}

export default DetailsPage;
