import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import './Dashboard.css'; // Custom CSS for styling

function Dashboard() {
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingsResponse = await axios.get('http://localhost:5000/api/listings');
        console.log('Listings:', listingsResponse.data); // Add this line to log the listings data
        const favoritesResponse = await axios.get('http://localhost:5000/api/users/favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setListings(listingsResponse.data);
        setFavorites(favoritesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const listingsResponse = await axios.get('http://localhost:5000/api/flats');
  //       const favoritesResponse = await axios.get('http://localhost:5000/api/users/favorites', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       });
  //       setListings(listingsResponse.data);
  //       setFavorites(favoritesResponse.data);
  //     } catch (err) {
  //       console.error('Error fetching data:', err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const isFavorite = (listingId) => {
    return favorites.some((fav) => fav._id === listingId);
  };


  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Available Listings</h2>
      {listings.length === 0 ? <p>No listings available</p> : null} {/* Add this line */}
      <div className="card-container">
        {listings.map((listing) => (
          <ListingCard
            key={listing._id}
            listing={listing}
            isFavorite={isFavorite(listing._id)}
          />
        ))}
      </div>
    </div>
  );
  
  // return (
  //   <div className="dashboard">
  //     <h2 className="dashboard-title">Available Listings</h2>
  //     <div className="card-container">
  //       {listings.map((listing) => (
  //         <ListingCard
  //           key={listing._id}
  //           listing={listing}
  //           isFavorite={isFavorite(listing._id)}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );
}

export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './Dashboard.css';
// import ListingCard from '../components/ListingCard';
// import { Card, Button } from 'react-bootstrap';

// function Dashboard() {
//   const [listings, setListings] = useState([]);
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const listingsResponse = await axios.get('http://localhost:5000/api/flats');
//         const favoritesResponse = await axios.get('http://localhost:5000/api/users/favorites', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setListings(listingsResponse.data);
//         setFavorites(favoritesResponse.data);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       }
//     };
//     fetchData();
//   }, []);

//   // useEffect(() => {
//   //   const fetchListings = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:5000/api/listings');
//   //       setListings(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching listings:', error);
//   //     }
//   //   };

//   //   fetchListings();
//   // }, []);

//   const isFavorite = (listingId) => {
//     return favorites.some(fav => fav._id === listingId);
//   };
  

//   return (
//     <div className="dashboard">
//       {/* <h2>Your Listings</h2> */}
//       <div className="card-container">
//         {listings.map((listing) => (
//           <div className="card" key={listing._id}>
//             <img src={`http://localhost:5000/${listing.images[0]}`} alt={listing.location} className="card-image" />
//             <div className="card-body">
//               <h3>{listing.location}</h3>
//               <p>Rent: {listing.rentMoney}</p>
//               <p>{listing.address}</p>
//               {/* Link to the detailed view page */}
//               <Link to={`/listing/${listing._id}`} className="btn btn-primary">
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [listings, setListings] = useState([]);

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/listings');
//         setListings(response.data);
//       } catch (error) {
//         console.error('Error fetching listings:', error);
//       }
//     };

//     fetchListings();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>Listed Flats</h2>
//       {listings.length > 0 ? (
//         <div className="listings">
//           {listings.map((listing, index) => (
//             <div key={index} className="card mb-3">
//               <div className="card-body">
//                 <h5 className="card-title">{listing.location}</h5>
//                 <p className="card-text">Address: {listing.address}</p>
//                 <p className="card-text">Pin Code: {listing.pinCode}</p>
//                 <p className="card-text">Rent: ₹{listing.rentMoney}</p>
//                 <p className="card-text">Description: {listing.description}</p>
//                 <p className="card-text">Contact: {listing.contactDetails}</p>
//                 {/* Optionally show images */}
//                 {listing.images && listing.images.length > 0 && (
//                   <div className="images">
//                     {listing.images.map((image, i) => (
//                       <img key={i} src={`http://localhost:5000/${image}`} alt="flat" className="img-thumbnail" />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No flats listed yet.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
