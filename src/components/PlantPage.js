import React, { useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({plants, onAddPlant, onUpdatePlant}) {
  const [searchTerm, setSearchTerm] = useState("");

  const displayedPlants = plants.filter((plant) => 
  plant.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant}/>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <PlantList plants={displayedPlants} onUpdatePlant={onUpdatePlant}/>
    </main>
  );
}

export default PlantPage;
