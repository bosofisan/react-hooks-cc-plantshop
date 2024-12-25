import React from "react";

function Search({searchTerm, setSearchTerm}) {
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange= {handleSearchChange} 
        // {(e) => console.log("Searching...")}
      />
    </div>
  );
}

export default Search;
