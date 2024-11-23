import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem('token'); // Check if the auth token exists in localStorage
  };

  const handleSearch = () => {
    if (isAuthenticated()) {
      if (searchQuery) {
        navigate(`/search?q=${searchQuery}`);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="hero-section text-center py-5">
        <h1>Find Your Perfect Flat Near You!</h1>
        <p>Renting made easy for students and professionals.</p>

        {/* Conditionally render the search and list your flat options based on authentication */}
        {isAuthenticated() ? (
          <>
            {/* Search Input Field */}
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter location or pin code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSearch}>
                Start Searching
              </button>
            </div>

            {/* List Your Flat button */}
            <Link to="/list-your-flat" className="btn btn-outline-secondary ms-3">
              List Your Flat
            </Link>
          </>
        ) : (
          <>
            {/* Message for non-authenticated users */}
            <p>Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to start searching or list your flat.</p>
          </>
        )}
      </div>

      {/* Features Section */}
      <div className="features-section py-5">
        <h2 className="text-center">Why Choose Us?</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <h3>Easy Search</h3>
            <p>Find flats near your location or desired pin code with just a few clicks.</p>
          </div>
          <div className="col-md-4">
            <h3>Responsive Listings</h3>
            <p>View detailed flat listings with images, videos, descriptions, and contact details.</p>
          </div>
          <div className="col-md-4">
            <h3>Distance Calculation</h3>
            <p>Know exactly how far a flat is from your current location.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works-section py-5">
        <h2 className="text-center">How It Works</h2>
        <div className="row">
          <div className="col-md-6">
            <h4>For Buyers</h4>
            <ol>
              <li>Sign up or log in.</li>
              <li>Search for flats near your location.</li>
              <li>View flat details and contact the seller.</li>
            </ol>
          </div>
          <div className="col-md-6">
            <h4>For Sellers</h4>
            <ol>
              <li>Sign up and list your flat.</li>
              <li>Add flat images, videos, and details.</li>
              <li>Manage your listings and bookings.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {/* <div className="call-to-action text-center py-5">
        <h2>Ready to find your new home?</h2>
        <Link to="/signup" className="btn btn-success">Sign Up Now</Link>
      </div> */}
      {isAuthenticated() ? (
        <>
          {/* Search Input Field */}
          {/* <h2>Ready to find your new home?</h2> */}
        </>
      ) : (
        <>
          {/* Message for non-authenticated users */}
          <h2>Ready to find your new home?</h2>
          <Link to="/signup" className="btn btn-success">Sign Up Now</Link>
        </>
      )}
    </div>
  );
};

export default Home;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   // Function to check if the user is authenticated
//   const isAuthenticated = () => {
//     // Example check: You might use a different method or context to determine authentication
//     return !!localStorage.getItem('authToken');
//   };

//   const handleSearch = () => {
//     if (isAuthenticated()) {
//       if (searchQuery) {
//         navigate(`/search?q=${searchQuery}`);
//       }
//     } else {
//       navigate('/login');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       {/* Hero Section */}
//       <div className="hero-section text-center py-5">
//         <h1>Find Your Perfect Flat Near You!</h1>
//         <p>Renting made easy for students and professionals.</p>

//         {/* Search Input Field */}
//         <div className="input-group mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter location or pin code"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button className="btn btn-primary" onClick={handleSearch}>
//             Start Searching
//           </button>
//         </div>

//         {/* Conditionally render List Your Flat button based on authentication */}
//         {isAuthenticated() ? (
//           <Link to="/list-your-flat" className="btn btn-outline-secondary ms-3">
//             List Your Flat
//           </Link>
//         ) : (
//           <Link to="/signup" className="btn btn-outline-secondary ms-3">
//             List Your Flat
//           </Link>
//         )}
//       </div>

//       {/* Features Section */}
//       <div className="features-section py-5">
//         <h2 className="text-center">Why Choose Us?</h2>
//         <div className="row text-center">
//           <div className="col-md-4">
//             <h3>Easy Search</h3>
//             <p>Find flats near your location or desired pin code with just a few clicks.</p>
//           </div>
//           <div className="col-md-4">
//             <h3>Responsive Listings</h3>
//             <p>View detailed flat listings with images, videos, descriptions, and contact details.</p>
//           </div>
//           <div className="col-md-4">
//             <h3>Distance Calculation</h3>
//             <p>Know exactly how far a flat is from your current location.</p>
//           </div>
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div className="how-it-works-section py-5">
//         <h2 className="text-center">How It Works</h2>
//         <div className="row">
//           <div className="col-md-6">
//             <h4>For Buyers</h4>
//             <ol>
//               <li>Sign up or log in.</li>
//               <li>Search for flats near your location.</li>
//               <li>View flat details and contact the seller.</li>
//             </ol>
//           </div>
//           <div className="col-md-6">
//             <h4>For Sellers</h4>
//             <ol>
//               <li>Sign up and list your flat.</li>
//               <li>Add flat images, videos, and details.</li>
//               <li>Manage your listings and bookings.</li>
//             </ol>
//           </div>
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div className="call-to-action text-center py-5">
//         <h2>Ready to find your new home?</h2>
//         <Link to="/signup" className="btn btn-success">Sign Up Now</Link>
//       </div>
//     </div>
//   );
// };

// export default Home;
