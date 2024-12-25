import React, { useState } from "react";

function PlantCard({plant, onUpdatePlant}) {
  const {id, name, image, price, isSoldOut} = plant;
  const [isInStock, setIsInStock] = useState(!isSoldOut);

  function handleStockToggle() {
    const newStockStatus = !isInStock;
    setIsInStock(newStockStatus);

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({isSoldOut: !newStockStatus}),
    })
    .then((response) => response.json())
    .then((updatedPlant) => {
      if(onUpdatePlant) {
       onUpdatePlant(updatedPlant);
      }
    });
  }
  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price}</p>
      {isInStock ? (
       <button className="primary" onClick={handleStockToggle}>In Stock</button>
      ) : (
       <button onClick={handleStockToggle}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
