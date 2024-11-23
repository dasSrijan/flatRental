import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap'; // Using Bootstrap for styling

const ListingCard = ({ listing, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = async () => {
    try {
      if (favorite) {
        // Remove from favorites
        await axios.delete(`http://localhost:5000/api/favorites/${listing._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFavorite(false);
      } else {
        // Add to favorites
        await axios.post(`http://localhost:5000/api/favorites/${listing._id}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Card className="listing-card">
      <Card.Img variant="top" src={`http://localhost:5000/${listing.images[0]}`} alt={listing.location} />
      <Card.Body>
        <Card.Title>{listing.location}</Card.Title>
        <Card.Text>Rent: {listing.rentMoney}</Card.Text>
        <Card.Text>{listing.address}</Card.Text>
        {/* View Details Button */}
        <div className="d-flex justify-content-evenly">
        <Link to={`/listing/${listing._id}`} className="btn btn-primary">
          View Details
        </Link>
        {/* Favorite Button */}
        <Button variant={favorite ? 'danger' : 'outline-danger'} onClick={toggleFavorite} className="ml-2">
          {favorite ? 'Unfavorite' : 'Favorite'}
        </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListingCard;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Card, Button } from 'react-bootstrap'; // Assuming Bootstrap for UI

// const ListingCard = ({ listing, isFavorite }) => {
//   const [favorite, setFavorite] = useState(isFavorite);

//   const toggleFavorite = async () => {
//     try {
//       if (favorite) {
//         // Remove from favorites
//         await axios.delete(`http://localhost:5000/api/favorites/${listing._id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setFavorite(false);
//       } else {
//         // Add to favorites
//         await axios.post(`http://localhost:5000/api/favorites/${listing._id}`, {}, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         setFavorite(true);
//       }
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//     }
//   };

//   return (
//     <Card style={{ width: '18rem' }}>
//       <Card.Body>
//         <Card.Title>{listing.location}</Card.Title>
//         <Card.Text>{listing.address}</Card.Text>
//         {/* Toggle favorite button */}
//         <Button
//           variant={favorite ? 'danger' : 'outline-danger'}
//           onClick={toggleFavorite}
//         >
//           {favorite ? 'Unfavorite' : 'Favorite'}
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ListingCard;
