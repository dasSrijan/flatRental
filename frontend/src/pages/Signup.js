import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", user);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            placeholder="Enter Username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <div className="text-center mt-3">
          <p>
            Already have an account?{' '}
            <Link to="/login">Log in</Link>
          </p>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;


  // return (
  //   <div className="container mt-5">
  //     <div className="row justify-content-center">
  //       <div className="col-md-6">
  //         <div className="card">
  //           <div className="card-header text-center">
  //             <h2>Signup</h2>
  //           </div>
  //           <div className="card-body">
  //             <form onSubmit={handleSubmit}>
  //               <div class="form-group">
  //                 <label for="exampleInputUsername1" htmlFor="username">Email address</label>
  //                 <input type="text" class="form-control" id="exampleInputUsername" placeholder="Enter Username"
  //                   name="username"
  //                   className="form-control"
  //                   value={user.username}
  //                   onChange={handleChange}
  //                   required />
  //               </div>
  //               <div class="form-group">
  //                 <label for="exampleInputEmail1" htmlFor="email">Email address</label>
  //                 <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email"
  //                   className="form-control"
  //                   value={user.email}
  //                   onChange={handleChange}
  //                   required />
  //                 <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  //               </div>
  //               <div class="form-group">
  //                 <label for="exampleInputPassword1" htmlFor="password">Password</label>
  //                 <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password"
  //                   className="form-control"
  //                   value={user.password}
  //                   onChange={handleChange}
  //                   required />
  //               </div>
  //               <div class="form-group form-check">
  //                 <input type="checkbox" class="form-check-input" id="exampleCheck1" />
  //                 <label class="form-check-label" for="exampleCheck1">Check me out</label>
  //               </div>
  //               <button type="submit" class="btn btn-primary">SignUp</button>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  // <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
  

// // src/pages/Signup.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Signup.css';

// function Signup() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/signup', formData);
//       navigate('/login');
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Signup</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input type="text" name="username" value={formData.username} onChange={handleChange} required />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </label>
//         <br />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// }

// export default Signup;
