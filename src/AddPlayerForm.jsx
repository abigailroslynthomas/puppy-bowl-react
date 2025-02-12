import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddPlayerForm() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔍 Current Route:", location.pathname);

    if (location.pathname !== "/add-player") {
      console.log("🚨 Redirect detected! Navigating back to /add-player");
      navigate("/add-player", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div>
      <h2>Add a New Player</h2>
      <form>
        <input type="text" placeholder="Player Name" />
        <input type="text" placeholder="Breed" />
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
}

export default AddPlayerForm;
