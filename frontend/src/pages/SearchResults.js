// // src/pages/SearchResults.js

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ListingCard from '../components/ListingCard';
import axios from 'axios';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);  // To store user's favorites
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/listings/search?q=${query}`);
        const data = await response.json();

        const favoritesResponse = await axios.get('http://localhost:5000/api/users/favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          setListings(data);
          setFavorites(favoritesResponse.data);  // Set user's current favorites
        } else {
          setError(data.message || 'No results found for your search');
        }
      } catch (err) {
        setError('Error fetching search results');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  // Function to check if a listing is a favorite
  const isFavorite = (listingId) => {
    return favorites.some(fav => fav._id === listingId);
  };

  // Toggle favorite status of a listing
  const toggleFavorite = async (listingId) => {
    const isFav = isFavorite(listingId);
    try {
      if (isFav) {
        // Remove from favorites
        await axios.delete(`http://localhost:5000/api/users/favorites/${listingId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFavorites(favorites.filter(fav => fav._id !== listingId));
      } else {
        // Add to favorites
        await axios.post(`http://localhost:5000/api/users/favorites/${listingId}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFavorites([...favorites, listings.find(listing => listing._id === listingId)]);
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
      <h2>Search Results for "{query}"</h2>
      {listings.length === 0 ? (
        <p>No listings found for your search</p>
      ) : (
        <Row>
          {listings.map((listing) => (
            <Col key={listing._id} md={4} className="mb-4">
              <ListingCard 
                listing={listing} 
                isFavorite={isFavorite(listing._id)}
                toggleFavorite={toggleFavorite}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchResults;

// import React, { useState, useEffect } from 'react';
// import { useSearchParams, Link } from 'react-router-dom';
// import { Card, Button, Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get('q');
//   const [listings, setListings] = useState([]);
//   const [favorites, setFavorites] = useState([]);  // To store user's favorites
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/listings/search?q=${query}`);
//         const data = await response.json();

//         const favoritesResponse = await axios.get('http://localhost:5000/api/users/favorites', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         if (response.ok) {
//           setListings(data);
//           setFavorites(favoritesResponse.data);  // Set user's current favorites
//         } else {
//           setError(data.message || 'No results found for your search');
//         }
//       } catch (err) {
//         setError('Error fetching search results');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSearchResults();
//   }, [query]);

//   // Function to check if a listing is a favorite
//   const isFavorite = (listingId) => {
//     return favorites.some(fav => fav._id === listingId);
//   };

//   // Toggle favorite status of a listing
//   const toggleFavorite = async (listingId) => {
//     const isFav = isFavorite(listingId);
//     try {
//       if (isFav) {
//         // Remove from favorites
//         await axios.delete(`http://localhost:5000/api/users/favorites/${listingId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setFavorites(favorites.filter(fav => fav._id !== listingId));
//       } else {
//         // Add to favorites
//         await axios.post(`http://localhost:5000/api/users/favorites/${listingId}`, {}, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setFavorites([...favorites, listings.find(listing => listing._id === listingId)]);
//       }
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <Container>
//       <h2>Search Results for "{query}"</h2>
//       {listings.length === 0 ? (
//         <p>No listings found for your search</p>
//       ) : (
//         <Row>
//           {listings.map((listing) => (
//             <Col key={listing._id} md={4} className="mb-4">
//               <Card>
//                 {listing.images.length > 0 && (
//                   <Card.Img variant="top" src={`http://localhost:5000/${listing.images[0]}`} alt={listing.location} />
//                 )}
//                 <Card.Body>
//                   <Card.Title>{listing.location}</Card.Title>
//                   <Card.Text>
//                     <strong>Address:</strong> {listing.address}<br />
//                     <strong>Pin Code:</strong> {listing.pinCode}<br />
//                     <strong>Nearby Institutions:</strong> {listing.nearbyInstitutions}<br />
//                     <strong>Rent:</strong> ₹{listing.rentMoney}
//                   </Card.Text>
//                   <Button variant="primary" as={Link} to={`/listing/${listing._id}`}>
//                     View Details
//                   </Button>
//                   {/* Toggle Favorite Button */}
//                   <Button 
//                     variant={isFavorite(listing._id) ? 'success' : 'outline-secondary'} 
//                     className="ml-2" 
//                     onClick={() => toggleFavorite(listing._id)}
//                   >
//                     {isFavorite(listing._id) ? 'Favorited' : 'Add to Favorites'}
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default SearchResults;


// import React, { useState, useEffect } from 'react';
// import { useSearchParams, Link } from 'react-router-dom';
// import { Card, Button, Container, Row, Col } from 'react-bootstrap';

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get('q');
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/listings/search?q=${query}`);
//         const data = await response.json();

//         if (response.ok) {
//           setListings(data);
//         } else {
//           setError(data.message || 'No results found for your search');
//         }
//       } catch (err) {
//         setError('Error fetching search results');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSearchResults();
//   }, [query]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <Container>
//       <h2>Search Results for "{query}"</h2>
//       {listings.length === 0 ? (
//         <p>No listings found for your search</p>
//       ) : (
//         <Row>
//           {listings.map((listing) => (
//             <Col key={listing._id} md={4} className="mb-4">
//               <Card>
//                 {listing.images.length > 0 && (
//                   <Card.Img variant="top" src={`http://localhost:5000/${listing.images[0]}`} alt={listing.location} />
//                 )}
//                 <Card.Body>
//                   <Card.Title>{listing.location}</Card.Title>
//                   <Card.Text>
//                     <strong>Address:</strong> {listing.address}<br />
//                     <strong>Pin Code:</strong> {listing.pinCode}<br />
//                     <strong>Nearby Institutions:</strong> {listing.nearbyInstitutions}<br />
//                     <strong>Rent:</strong> ₹{listing.rentMoney}
//                   </Card.Text>
//                   <Button variant="primary" as={Link} to={`/listing/${listing._id}`}>
//                     View Details
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default SearchResults;



// // src/pages/SearchResults.js
// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get('q');
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/listings/search?q=${query}`);
//         const data = await response.json();

//         if (response.ok) {
//           setListings(data);
//         } else {
//           setError(data.message || 'No results found for your search');
//         }
//       } catch (err) {
//         setError('Error fetching search results');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSearchResults();
//   }, [query]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>Search Results for "{query}"</h2>
//       {listings.length === 0 ? (
//         <p>No listings found for your search</p>
//       ) : (
//         <div>
//           {listings.map((listing) => (
//             <div key={listing._id}>
//               <h3>{listing.location}</h3>
//               <p>Address: {listing.address}</p>
//               <p>Pin Code: {listing.pinCode}</p>
//               <p>Nearby Institutions: {listing.nearbyInstitutions}</p>
//               <p>Rent: {listing.rentMoney}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResults;
