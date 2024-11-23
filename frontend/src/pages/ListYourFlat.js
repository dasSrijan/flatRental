import React, { useState } from 'react';
import axios from 'axios';

const ListYourFlat = () => {
  const [formData, setFormData] = useState({
    location: '',
    address: '',
    pinCode: '',
    nearbyInstitutions: '',
    rentMoney: '',
    images: [],
    videos: [],
    description: '',
    contactDetails: '',
  });

  // Function to handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: Array.from(files) });
  };

  // Function to submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the token from localStorage for authentication
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('No token found');
      alert('No token found. Please log in again.');
      return;
    }
  
    console.log('Token:', token); // Log the token

    // Create a new FormData object
    const form = new FormData();

    // Append all form fields and files to the FormData object
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        // If the form field is an array (like images or videos), append each file
        formData[key].forEach((file) => form.append(key, file));
      } else {
        form.append(key, formData[key]);
      }
    });

    try {
      // Send the POST request with the form data and token in headers
      await axios.post('http://localhost:5000/api/listings', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Add token for authorization
        },
      });
      alert('Flat listed successfully!');
    } catch (error) {
      console.error('Error listing flat:', error);
      alert('Failed to list flat.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>List Your Flat</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Pin Code</label>
          <input
            type="text"
            className="form-control"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nearby Institutions/Offices</label>
          <input
            type="text"
            className="form-control"
            name="nearbyInstitutions"
            value={formData.nearbyInstitutions}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rent Money</label>
          <input
            type="number"
            className="form-control"
            name="rentMoney"
            value={formData.rentMoney}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Images (6-10)</label>
          <input
            type="file"
            className="form-control"
            name="images"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Videos (Optional, up to 2)</label>
          <input
            type="file"
            className="form-control"
            name="videos"
            multiple
            onChange={handleFileChange}
            accept="video/*"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Details</label>
          <input
            type="text"
            className="form-control"
            name="contactDetails"
            value={formData.contactDetails}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">List Flat</button>
      </form>
    </div>
  );
};

export default ListYourFlat;
// import React, { useState } from 'react';



// import axios from 'axios';

// const ListYourFlat = () => {
//   const [formData, setFormData] = useState({
//     location: '',
//     address: '',
//     pinCode: '',
//     nearbyInstitutions: '',
//     rentMoney: '',
//     images: [],
//     videos: [],
//     description: '',
//     contactDetails: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: Array.from(files) });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     const form = new FormData();
//     Object.keys(formData).forEach(key => {
//       if (Array.isArray(formData[key])) {
//         formData[key].forEach(file => form.append(key, file));
//       } else {
//         form.append(key, formData[key]);
//       }
//     });

//     try {
//       await axios.post('http://localhost:5000/api/listings', form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Flat listed successfully!');
//     } catch (error) {
//       console.error('Error listing flat:', error);
//       alert('Failed to list flat.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>List Your Flat</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Location</label>
//           <input
//             type="text"
//             className="form-control"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Address</label>
//           <input
//             type="text"
//             className="form-control"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Pin Code</label>
//           <input
//             type="text"
//             className="form-control"
//             name="pinCode"
//             value={formData.pinCode}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Nearby Institutions/Offices</label>
//           <input
//             type="text"
//             className="form-control"
//             name="nearbyInstitutions"
//             value={formData.nearbyInstitutions}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Rent Money</label>
//           <input
//             type="number"
//             className="form-control"
//             name="rentMoney"
//             value={formData.rentMoney}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Images (6-10)</label>
//           <input
//             type="file"
//             className="form-control"
//             name="images"
//             multiple
//             onChange={handleFileChange}
//             accept="image/*"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Videos (Optional, up to 2)</label>
//           <input
//             type="file"
//             className="form-control"
//             name="videos"
//             multiple
//             onChange={handleFileChange}
//             accept="video/*"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             className="form-control"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Contact Details</label>
//           <input
//             type="text"
//             className="form-control"
//             name="contactDetails"
//             value={formData.contactDetails}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">List Flat</button>
//       </form>
//     </div>
//   );
// };

// export default ListYourFlat;
