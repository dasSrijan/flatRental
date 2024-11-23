import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import EditFlatForm from './EditFlatForm';

const MyLists = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingListingId, setEditingListingId] = useState(null); // State for tracking the listing being edited

  useEffect(() => {
    const fetchMyListings = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/listings/my-lists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setListings(response.data);
      } catch (err) {
        setError('Failed to fetch listings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, []);

//   const handleEdit = (listingId) => {
//     console.log('Edit listing with ID:', listingId);
//     // Will implement later
//   };
    const handleEdit = (listingId) => {
    setEditingListingId(listingId);
  };

  const handleCloseForm = () => {
    setEditingListingId(null);
  };
   
  // Function to handle deleting a listing
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/listings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setListings(listings.filter((listing) => listing._id !== id)); // Update state to remove deleted listing
      } else {
        setError('Error deleting the listing');
      }
    } catch (err) {
      setError('Error deleting the listing');
    }
  };
  // const handleDelete = (listingId) => {
  //   console.log('Delete listing with ID:', listingId);
  //   // Will implement later
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-5">
      <h2>My Listings</h2>
      <div className="row">
        {listings.map((listing) => (
          <div className="col-md-4 mb-4" key={listing._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{listing.location}</h5>
                <p className="card-text">{listing.description}</p>
                <p className="card-text">Rent: {listing.rentMoney}</p>
                <p className="card-text">Contact: {listing.contactDetails}</p>
                
                {/* Button group for Edit and Delete */}
                <div className="d-flex justify-content-evenly mb-3">
                  {/* <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(listing._id)}
                  >
                    Edit
                  </button> */}
                  <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(listing._id)}
                >
                  Edit
                </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(listing._id)}
                  >
                    Delete
                  </button>
                </div>
                
                {/* View Details button on a new line */}
                <div className="text-center">
                  <Link
                    to={`/listing/${listing._id}`}
                    className="btn btn-secondary"
                  >
                    View Details
                  </Link>
                  {/* Show Edit Form if editingListingId matches the current listing's ID */}
                {editingListingId === listing._id && (
                  <EditFlatForm listingId={listing._id} closeForm={handleCloseForm} />
                )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLists;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";

// const MyLists = () => {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchMyListings = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const response = await axios.get('http://localhost:5000/api/listings/my-lists', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setListings(response.data);
//       } catch (err) {
//         setError('Failed to fetch listings');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyListings();
//   }, []);

//   const handleEdit = (listingId) => {
//     console.log('Edit listing with ID:', listingId);
//     // Will implement later
//   };

//   const handleDelete = (listingId) => {
//     console.log('Delete listing with ID:', listingId);
//     // Will implement later
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2>My Listings</h2>
//       <div className="row">
//         {listings.map((listing) => (
//           <div className="col-md-4 mb-4" key={listing._id}>
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">{listing.location}</h5>
//                 <p className="card-text">{listing.description}</p>
//                 <p className="card-text">Rent: {listing.rentMoney}</p>
//                 <p className="card-text">Contact: {listing.contactDetails}</p>
//                 <button
//                   className="btn btn-primary me-2"
//                   onClick={() => handleEdit(listing._id)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(listing._id)}
//                 >
//                   Delete
//                 </button>
                
//                 <hr></hr>
//                 <Link
//                   to={`/listing/${listing._id}`} // Route to listing details page
//                   className="btn btn-primary"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyLists;
