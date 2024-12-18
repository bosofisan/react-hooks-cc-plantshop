import React, {useState, useEffect} from "react";
import PlantList from "./PlantList";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState ([]);

  useEffect (() => {
  fetch("http://localhost:6001/plants")
  .then((response) => response.json())
  .then((data) => setPlants(data));
}, []);

  return (
    <div className="app">
      <h1>Plantsy</h1>
      <PlantList plants={plants} />
      <Header />
      <PlantPage />
    </div>
  );
}

export default App;
