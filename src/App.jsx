import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListOfPlayers from "./ListOfPlayers";
import PlayerDetails from "./PlayerDetails";
import AddPlayerForm from "./AddPlayerForm";

function App() {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch("https://fsa-puppy-bowl.herokuapp.com/api/2206-CPU-RM-WEB-PT/players")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => {
        console.error('Error fetching puppies:', error);
      });
  }, []);

  const addPlayer = (player) => {
    setPlayers([...players, player]);
  };

  const deletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const filteredPlayers = players.filter(player => player.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Router>
      <div>
        <h1>Puppy Bowl</h1>
        <input 
          type="text" 
          placeholder="Search for a player"
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <AddPlayerForm addPlayer={addPlayer} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ListOfPlayers players={filteredPlayers} onDelete={deletePlayer} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
