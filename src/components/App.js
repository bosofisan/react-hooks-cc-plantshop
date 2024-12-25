import React, {useState, useEffect} from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";
// import Header from "./Header";
// import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState ([]);
  const [searchTerm, setSearchTerm] = useState ("");

  useEffect (() => {
  fetch("http://localhost:6001/plants")
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch plants");
    return response.json();
  })
  .then((data) => setPlants(data))
  .catch((error) => console.error("Error fetching plants:", error));
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

function handleUpdatePlant(updatedPlant) {
  setPlants((prevPlants) =>
    prevPlants.map((plant) =>
      plant.id ===updatedPlant.id ? updatedPlant : plant));
}

const displayedPlants = plants.filter ((plant) =>
plant.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="app">
      <h1>Plantsy</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={displayedPlants} onUpdatePlant={handleUpdatePlant}/>
      <NewPlantForm onAddPlant={handleAddPlant} />
      {/* <Header />
      <PlantPage /> */}
    </div>
  );
}

export default App;
