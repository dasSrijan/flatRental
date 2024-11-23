import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap'; // Import Bootstrap components

const MyProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/listings/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you use token for auth
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError('Error fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">My Profile</h2>
      <Card style={{ width: '18rem' }} className="mx-auto">
        <Card.Body>
          <Card.Title>{profile.username}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {profile.email}
          </Card.Text>
          <Card.Text>
            <strong>Username:</strong> {profile.username}
          </Card.Text>
          {/* Add more user details here if needed */}
          {/* <Button variant="primary">Edit Profile</Button> */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyProfile;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MyProfile = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch user details when the component mounts
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         // Fetch token from localStorage
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           setError('User is not logged in.');
//           setLoading(false);
//           return;
//         }

//         // Assuming you have a backend API that returns user details
//         // const response = await axios.get('http://localhost:5000/api/listings/profile', {
//         //     headers: {
//         //       Authorization: `Bearer ${token}`,
//         //     },
//         //   });
//         const response = await fetch('http://localhost:5000/api/listings/profile', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             // 'Content-Type': 'application/json',
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setUserDetails(data);
//         } else {
//           setError(data.message || 'Failed to fetch user profile.');
//         }
//       } catch (err) {
//         setError('Error fetching profile.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   if (loading) {
//     return <div>Loading profile...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>My Profile</h2>
//       {userDetails ? (
//         <div>
//           <p><strong>Username:</strong> {userDetails.username}</p>
//           <p><strong>Email:</strong> {userDetails.email}</p>
//           {/* Add more fields as needed */}
//         </div>
//       ) : (
//         <p>No profile information available.</p>
//       )}
//     </div>
//   );
// };

// export default MyProfile;

// import React, { useState, useEffect } from 'react';
// import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

// const MyProfile = () => {
//   const [userData, setUserData] = useState({
//     username: '',
//     email: '',
//     contactDetails: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     // Fetch the user profile on component mount
//     const fetchUserProfile = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/users/me', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
//           }
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setUserData(data);
//         } else {
//           setError(data.message || 'Failed to load profile');
//         }
//       } catch (err) {
//         setError('Error loading profile');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Function to handle form submission and update user profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const response = await fetch('http://localhost:5000/api/users/me', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(userData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess('Profile updated successfully');
//       } else {
//         setError(data.message || 'Failed to update profile');
//       }
//     } catch (err) {
//       setError('Error updating profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handling input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({
//       ...userData,
//       [name]: value
//     });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container>
//       <h2>My Profile</h2>

//       {error && <Alert variant="danger">{error}</Alert>}
//       {success && <Alert variant="success">{success}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Form.Group as={Row} controlId="formUsername">
//           <Form.Label column sm={2}>
//             Username
//           </Form.Label>
//           <Col sm={10}>
//             <Form.Control
//               type="text"
//               name="username"
//               value={userData.username}
//               onChange={handleChange}
//               required
//             />
//           </Col>
//         </Form.Group>

//         <Form.Group as={Row} controlId="formEmail">
//           <Form.Label column sm={2}>
//             Email
//           </Form.Label>
//           <Col sm={10}>
//             <Form.Control
//               type="email"
//               name="email"
//               value={userData.email}
//               onChange={handleChange}
//               required
//             />
//           </Col>
//         </Form.Group>

//         <Form.Group as={Row} controlId="formContactDetails">
//           <Form.Label column sm={2}>
//             Contact Details
//           </Form.Label>
//           <Col sm={10}>
//             <Form.Control
//               type="text"
//               name="contactDetails"
//               value={userData.contactDetails}
//               onChange={handleChange}
//               required
//             />
//           </Col>
//         </Form.Group>

//         <Button variant="primary" type="submit" disabled={loading}>
//           Update Profile
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default MyProfile;
