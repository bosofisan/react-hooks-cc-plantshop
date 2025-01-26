import React from "react";
// import PlantList from "./PlantList";
// import NewPlantForm from "./NewPlantForm";
// import Search from "./Search";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {

  return (
    <div className="app">
      <h1>Plantsy</h1>
      {/* <Search setSearchTerm={setSearchTerm} />
      <PlantList plants={displayedPlants} onUpdatePlant={handleUpdatePlant}/>
      <NewPlantForm onAddPlant={handleAddPlant} /> */}
      <Header />
      <PlantPage />
    </div>
  );
}

export default App;
