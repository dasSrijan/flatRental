// src/components/HomePageSearch.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePageSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Redirect to /search?q=<searchQuery>
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div>
      <h2>Search for Flats</h2>
      <input 
        type="text" 
        placeholder="Enter location, pin code, address, or nearby institution" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default HomePageSearch;
