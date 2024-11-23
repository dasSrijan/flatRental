// src/pages/ListingDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

const ListingDetails = () => {
  const { id } = useParams();  // Get listing id from URL params
  const [listing, setListing] = useState(null);
  const [favorites, setFavorites] = useState([]);  // To store user's favorites
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/listings/${id}`);
        const data = await response.json();

        const favoritesResponse = await axios.get(`http://localhost:5000/api/favorites`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          setListing(data);
          setFavorites(favoritesResponse.data);  // Set user's current favorites
        } else {
          setError('Listing not found');
        }
      } catch (err) {
        setError('Error fetching listing details');
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id]);

  // Function to check if the listing is a favorite
  const isFavorite = (listingId) => {
    return favorites.some(fav => fav._id === listingId);
  };

  // Toggle favorite status of the listing
  const toggleFavorite = async (listingId) => {
    const isFav = isFavorite(listingId);
    try {
      if (isFav) {
        // Remove from favorites
        await axios.delete(`http://localhost:5000/api/favorites/${listingId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFavorites(favorites.filter(fav => fav._id !== listingId));
      } else {
        // Add to favorites
        await axios.post(`http://localhost:5000/api/favorites/${listingId}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFavorites([...favorites, listing]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      {listing ? (
        <Row>
          <Col md={8}>
            <Card>
              {/* Carousel to display images/videos */}
      <Carousel>
        {listing.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={`http://localhost:5000/${image}`}
              alt={`Image ${index + 1}`}
            />
          </Carousel.Item>
        ))}
        {listing.videos.map((video, index) => (
          <Carousel.Item key={index}>
            <video className="d-block w-100" controls>
              <source src={`http://localhost:5000/${video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Carousel.Item>
        ))}
      </Carousel>
              {/* {listing.images.length > 0 && (
                <Card.Img variant="top" src={`http://localhost:5000/${listing.images[0]}`} alt={listing.location} />
              )} */}
              <Card.Body>
                <Card.Title>{listing.location}</Card.Title>
                <Card.Text>
                  <strong>Address:</strong> {listing.address}<br />
                  <strong>Pin Code:</strong> {listing.pinCode}<br />
                  <strong>Nearby Institutions:</strong> {listing.nearbyInstitutions}<br />
                  <strong>Rent:</strong> ₹{listing.rentMoney}<br />
                  <strong>Contact:</strong> {listing.contactDetails}<br />
                  <strong>Description:</strong> {listing.description}
                </Card.Text>
                {/* View Details Button */}
                {/* <Button variant="primary" onClick={() => console.log('View More Details')}>
                  View More Details
                </Button> */}
                {/* Favorite Button */}
                <Button 
                  variant={isFavorite(listing._id) ? 'danger' : 'outline-danger'} 
                  className="ml-2" 
                  onClick={() => toggleFavorite(listing._id)}
                >
                  {isFavorite(listing._id) ? 'Unfavorite' : 'Favorite'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Listing not found</p>
      )}
    </Container>
  );
};

export default ListingDetails;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// // import './ListingDetails.css'; // Optional: You can create a separate CSS file for additional styles

// const ListingDetails = () => {
//   const { id } = useParams();
//   const [listing, setListing] = useState(null);
//   const [error, setError] = useState('');

//   const fetchListingDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
//       setListing(response.data);
//     } catch (error) {
//       console.error('Error fetching listing details:', error);
//       setError('No details available for this listing');
//     }
//   };

//   useEffect(() => {
//     fetchListingDetails();
//   }, [id]);

//   if (error) {
//     return <div className="alert alert-danger">{error}</div>;
//   }

//   if (!listing) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header">
//           <h2>{listing.location}</h2>
//           <p>{listing.address}, {listing.pinCode}</p>
//         </div>
//         <div className="card-body">
//           <h5 className="card-title">Details</h5>
//           <p className="card-text">{listing.description}</p>
//           <p><strong>Rent: </strong>${listing.rentMoney}</p>
//           <p><strong>Contact: </strong>{listing.contactDetails}</p>
//           <p><strong>Nearby Institutions: </strong>{listing.nearbyInstitutions}</p>
          
//           <h5 className="mt-4">Images</h5>
//           <div className="image-gallery">
//             {listing.images.map((image, index) => (
//               <img key={index} src={`http://localhost:5000/${image}`} alt={`Listing ${index + 1}`} className="img-thumbnail" />
//             ))}
//           </div>

//           {listing.videos.length > 0 && (
//             <div className="mt-4">
//               <h5>Videos</h5>
//               {listing.videos.map((video, index) => (
//                 <video key={index} controls className="video-responsive">
//                   <source src={`http://localhost:5000/${video}`} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListingDetails;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function ListingDetails() {
//   const { id } = useParams(); // Get the listing id from the URL
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchListingDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
//         if (response.data) {
//           setListing(response.data);
//         } else {
//           setListing(null); // Handle case where no listing is found
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching listing details:', error);
//         setLoading(false);
//       }
//     };

//     fetchListingDetails();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!listing) {
//     return <div>No details available for this listing.</div>;
//   }

//   return (
//     <div className="listing-details">
//       <h2>{listing.location || 'No location available'}</h2>
//       <p>{listing.address || 'No address available'}</p>
//       <p>Rent: ₹{listing.rentMoney || 'Not specified'}</p>
//       <p>{listing.description || 'No description available'}</p>
//       <p>Contact: {listing.contactDetails || 'No contact details available'}</p>

//       <h3>Images:</h3>
//       {listing.images && listing.images.length > 0 ? (
//         listing.images.map((image, index) => (
//           <img key={index} src={`http://localhost:5000/${image}`} alt="Flat" className="listing-image" />
//         ))
//       ) : (
//         <p>No images available</p>
//       )}

//       <h3>Videos:</h3>
//       {listing.videos && listing.videos.length > 0 ? (
//         listing.videos.map((video, index) => (
//           <video key={index} controls className="listing-video">
//             <source src={`http://localhost:5000/${video}`} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         ))
//       ) : (
//         <p>No videos available</p>
//       )}
//     </div>
//   );
// }

// export default ListingDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function ListingDetails() {
//   const { id } = useParams(); // Get the listing id from the URL
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchListingDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
//         setListing(response.data);
//         setLoading(false); // Set loading to false after fetching
//       } catch (error) {
//         console.error('Error fetching listing details:', error);
//         setLoading(false);
//       }
//     };

//     fetchListingDetails();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!listing) {
//     return <div>No details available for this listing.</div>;
//   }

//   return (
//     <div className="listing-details">
//       <h2>{listing.location}</h2>
//       <p>{listing.address}</p>
//       <p>Rent: ₹{listing.rentMoney}</p>
//       <p>{listing.description}</p>
//       <p>Contact: {listing.contactDetails}</p>

//       <h3>Images:</h3>
//       {listing.images.map((image, index) => (
//         <img key={index} src={`http://localhost:5000/${image}`} alt="Flat" className="listing-image" />
//       ))}

//       <h3>Videos:</h3>
//       {listing.videos.map((video, index) => (
//         <video key={index} controls className="listing-video">
//           <source src={`http://localhost:5000/${video}`} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ))}
//     </div>
//   );
// }

// export default ListingDetails;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function ListingDetails() {
//   const { id } = useParams(); // Get the listing ID from the URL
//   const [listing, setListing] = useState(null);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
//         setListing(response.data);
//       } catch (error) {
//         console.error('Error fetching listing details:', error);
//       }
//     };

//     fetchListing();
//   }, [id]);

//   if (!listing) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="listing-details">
//       <h2>{listing.location}</h2>
//       <p>Address: {listing.address}</p>
//       <p>Pin Code: {listing.pinCode}</p>
//       <p>Nearby Institutions: {listing.nearbyInstitutions}</p>
//       <p>Rent: {listing.rentMoney}</p>
//       <p>Description: {listing.description}</p>
//       <p>Contact Details: {listing.contactDetails}</p>

//       <div className="images">
//         <h3>Images</h3>
//         {listing.images.map((image, index) => (
//           <img key={index} src={`http://localhost:5000/${image}`} alt={`Flat Image ${index}`} className="listing-image" />
//         ))}
//       </div>

//       <div className="videos">
//         <h3>Videos</h3>
//         {listing.videos.map((video, index) => (
//           <video key={index} controls className="listing-video">
//             <source src={`http://localhost:5000/${video}`} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ListingDetails;
