import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = ({ section }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user listings when the "my-lists" section is active
  useEffect(() => {
    const fetchListings = async () => {
      if (section === "my-lists") {
        setLoading(true);
        try {
          const response = await axios.get("/api/listings/my-lists", {
            headers: {
              'x-auth-token': localStorage.getItem("token") // Use the same header key as in middleware
            },
          });
          setListings(response.data);
        } catch (err) {
          setError("Failed to load your listings. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchListings();
  }, [section]);

  // Handle content rendering based on the section
  const renderContent = () => {
    switch (section) {
      case "profile":
        return (
          <div>
            <h3 className="mt-4">My Profile</h3>
            <p>Details about the user go here.</p>
          </div>
        );
      case "my-lists":
        return (
          <div>
            <h3 className="mt-4">My Lists</h3>
            {loading ? (
              <p>Loading your listings...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : listings.length > 0 ? (
              listings.map((listing) => (
                <div key={listing._id} className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{listing.title}</h5>
                    <p className="card-text">{listing.description}</p>
                    <Link to={`/listing/${listing._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                    <button
                      className="btn btn-secondary ms-2"
                      onClick={() => navigate(`/edit-listing/${listing._id}`)}
                    >
                      Edit Listing
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDeleteListing(listing._id)}
                    >
                      Delete Listing
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No listings found.</p>
            )}
          </div>
        );
      case "favourite":
        return (
          <div>
            <h3 className="mt-4">Favourite</h3>
            <p>Your favourite flats will be displayed here.</p>
          </div>
        );
      default:
        return <p>Select a valid section.</p>;
    }
  };

  // Handle listing deletion
  const handleDeleteListing = async (id) => {
    try {
      await axios.delete(`/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (err) {
      alert("Failed to delete the listing. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className={`nav-link ${section === "profile" ? "active" : ""}`} to="/profile">
            My Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${section === "my-lists" ? "active" : ""}`} to="/my-lists">
            My Lists
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${section === "favourite" ? "active" : ""}`} to="/favourite">
            Favourite
          </Link>
        </li>
      </ul>

      {/* Render the section content */}
      <div className="tab-content mt-4">{renderContent()}</div>
    </div>
  );
};

export default UserProfile;




// // components/UserProfile.js
// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import axios from 'axios';

// const UserProfile = ({ section }) => {
//   // Dynamically render content based on the section
//   const renderContent = () => {
//     switch (section) {
//       case "profile":
//         return (
//           <div>
//             <h3 className="mt-4">My Profile</h3>
//             <p>Details about the user go here.</p>
//           </div>
//         );
//       case "my-lists":
//         return (
//           <div>
//             <h3 className="mt-4">My Lists</h3>
//             {listings.length > 0 ? (
//               listings.map(listing => (
//                 <div key={listing._id} className="card mb-2">
//                   <div className="card-body">
//                     <h5 className="card-title">{listing.title}</h5>
//                     <p className="card-text">{listing.description}</p>
//                     <Link to={`/listing/${listing._id}`} className="btn btn-primary">
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No listings found.</p>
//             )}
//           </div>
//           // <div>
//           //   <h3 className="mt-4">My Lists</h3>
//           //   <p>Your flat listings will be displayed here.</p>
//           //   {/* <Link className={`nav-link ${section === "my-lists" ? "active" : ""}`} to="/my-lists">
//           //   My Lists
//           // </Link> */}
//           // </div>
//         );
//       case "favourite":
//         return (
//           <div>
//             <h3 className="mt-4">Favourite</h3>
//             <p>Your favourite flats will be displayed here.</p>
//           </div>
//         );
//       default:
//         return <p>Select a valid section.</p>;
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <ul className="nav nav-tabs">
//         <li className="nav-item">
//           <Link className={`nav-link ${section === "profile" ? "active" : ""}`} to="/profile">
//             My Profile
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className={`nav-link ${section === "my-lists" ? "active" : ""}`} to="/my-lists">
//             My Lists
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className={`nav-link ${section === "favourite" ? "active" : ""}`} to="/favourite">
//             Favourite
//           </Link>
//         </li>
//       </ul>

//       {/* Render the section content */}
//       <div className="tab-content mt-4">{renderContent()}</div>
//     </div>
//   );
// };

// export default UserProfile;
