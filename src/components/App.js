import React, {useState, useEffect} from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
// import Header from "./Header";
// import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState ([]);

  useEffect (() => {
  fetch("http://localhost:6001/plants")
  .then((response) => response.json())
  .then((data) => setPlants(data));
}, []);

function handleAddPlant(newPlant) {
  fetch("http://localhost:6001/plants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlant),
  })
  .then((response) => response.json())
  .then ((addPlant) => {
    setPlants((prevPlants) => [...prevPlants,addPlant]);
  });
}

  return (
    <div className="app">
      <h1>Plantsy</h1>
      <PlantList plants={plants} />
      <NewPlantForm onAddPlant={handleAddPlant} />
      {/* <Header />
      <PlantPage /> */}
    </div>
  );
}

export default App;
