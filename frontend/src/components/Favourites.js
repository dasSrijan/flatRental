import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFavorites(response.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div p-2>
      <h2>My Favorites</h2>
      <div className="row">
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          favorites.map(listing => (
            <div key={listing._id} className="col-md-4">
              <ListingCard listing={listing} isFavorite={true} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;
