import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState ([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect (() => {
    fetch("http://localhost:6001/plants")
    .then((response) => response.json())
    .then((data) => setPlants(data))
    .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  //add new plant
  function handleAddPlant(newPlant) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
    .then((response) => response.json())
    .then (() => {
      fetch("http://localhost:6001/plants")
        .then((response) => response.json())
        .then((data) => setPlants(data))
        .catch((error) => console.error("Error refetching plants:", error));
    })
    .catch((error) => console.error("Error adding plant:", error));
  }

  //update plant data
  function handleUpdatePlant(updatedPlant) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant));
  }

  //filter plants
  const displayedPlants = plants.filter((plant) => 
  plant.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={displayedPlants} onUpdatePlant={handleUpdatePlant} />
    </main>
  );
}

export default PlantPage;
