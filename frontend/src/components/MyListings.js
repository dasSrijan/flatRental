// components/MyListings.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  

  useEffect(() => {
    // Fetch user's listings from the backend (MongoDB)
    const fetchListings = async () => {
      try {
        const response = await axios.get("/api/listings/my-listings"); // Adjust route as per your backend API
        setListings(response.data); // Assuming response contains an array of listings
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Listings</h3>
      <div className="row">
        {listings.map((listing) => (
          <div className="col-md-4" key={listing._id}>
            <div className="card mb-4 shadow-sm">
              <img
                src={listing.images[0]} // Assuming 'images' array in each listing
                className="card-img-top"
                alt="Flat"
              />
              <div className="card-body">
                <h5 className="card-title">{listing.title}</h5>
                <p className="card-text">{listing.description}</p>
                <Link
                  to={`/listing/${listing._id}`} // Route to listing details page
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
