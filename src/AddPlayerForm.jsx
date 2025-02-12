import { useState } from "react";

const API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-PT-WEB-PT/players";

function AddPlayerForm({ setPlayers }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("field");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);
  
    if (!name.trim() || !breed.trim() || !imageUrl.trim()) {
      setError("⚠️ All fields are required.");
      return;
    }
  
    // ✅ Ensure proper request structure
    const newPlayer = {
      player: {
        name: name.trim(),
        breed: breed.trim(),
        status: status.trim(),
        imageUrl: imageUrl.trim(),
      }
    };
  
    try {
      console.log("📢 Sending request to API:", JSON.stringify(newPlayer, null, 2));
  
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlayer),
      });
  
      console.log("📢 Raw API Response:", response);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("📢 API Response:", data);
  
      if (data.success && data.data && data.data.player) {
        setPlayers(prev => [...prev, data.data.player]); // ✅ Add new player instantly
        setSuccessMessage(`✅ Player "${data.data.player.name}" added successfully!`);
        setName("");
        setBreed("");
        setStatus("field");
        setImageUrl("");
      } else {
        console.error("🚨 API Error Response:", data.error);
        setError(`Failed to add player: ${JSON.stringify(data.error)}`);
      }
    } catch (err) {
      console.error("🚨 Network or API error:", err);
      setError(`An error occurred: ${err.message}`);
    }
  }
  
  return (
    <div>
      <h2>Add a New Player</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Player Name" required />
        <input type="text" value={breed} onChange={e => setBreed(e.target.value)} placeholder="Breed" required />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="field">Field</option>
          <option value="bench">Bench</option>
        </select>
        <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" required />
        <button type="submit">Add Player</button>

        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default AddPlayerForm;
