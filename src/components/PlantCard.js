import React, { useState, useEffect } from "react";

function PlantCard({ plant, onUpdatePlant }) {
  const { id, name, image, price, isSoldOut } = plant;

  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(price);
  const [isInStock, setIsInStock] = useState(!isSoldOut);

  useEffect(() => {
    setNewPrice(price);
  }, [price]);

  // Handle toggling stock status
  function handleStockToggle() {
    const newStockStatus = !isInStock;
    setIsInStock(newStockStatus);

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "Application/JSON" },
      body: JSON.stringify({ isSoldOut: !newStockStatus }), 
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update stock status");
        return response.json();
      })
      .then((updatedPlant) => {
        onUpdatePlant(updatedPlant);
      })
      .catch((error) => console.error("Error updating stock status:", error));
  }

  // Handle editing price
  function handleEditClick() {
    setIsEditing(true);
  }

  function handleCancelClick() {
    setIsEditing(false);
    setNewPrice(price); // Reset to the original price if canceled
  }

  function handleSaveClick() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "Application/JSON" },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update price");
        return response.json();
      })
      .then((updatedPlant) => {
        onUpdatePlant(updatedPlant);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating price:", error));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      {isEditing ? (
        <div>
          <input
            type="number"
            step="0.01"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button className="primary" onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <>
          <p>Price: {price}</p> 
          <button className="primary" onClick={handleEditClick}>
            Edit
          </button>
        </>
      )}
      {isInStock ? (
        <button className="primary" onClick={handleStockToggle}>
          In Stock
        </button>
      ) : (
        <button onClick={handleStockToggle}>Out of Stock</button>
      )}
    </li>
  );
} 

export default PlantCard;
