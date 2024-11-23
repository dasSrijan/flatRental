// components/EditListing.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState({ title: "", description: "", rent: 0 });

  useEffect(() => {
    // Fetch the listing details to pre-fill the form
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };

    fetchListingDetails();
  }, [id]);

  // Handle form submission for updating listing
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/listings/${id}`, listing);
      alert("Listing updated successfully.");
      navigate(`/listing/${id}`); // Redirect to the details page after updating
    } catch (error) {
      console.error("Error updating listing:", error);
      alert("Error updating listing.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Listing</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={listing.title}
            onChange={(e) => setListing({ ...listing, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={listing.description}
            onChange={(e) => setListing({ ...listing, description: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rent</label>
          <input
            type="number"
            className="form-control"
            value={listing.rent}
            onChange={(e) => setListing({ ...listing, rent: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default EditListing;
