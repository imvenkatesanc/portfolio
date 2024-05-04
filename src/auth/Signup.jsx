import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Loading from '../main/Loading'; // Import the Loading component

function Signup() {
  const [userType, setUserType] = useState("Influencer");
  const [Name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form
    try {
      const response = await fetch('http://localhost:4000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userType,
          Name,
          username,
          password
        })
      });
      const data = await response.json();
      if (response.ok) {
        // Registration successful, redirect to home page
        navigate('/home');
      } else {
        // Registration failed, display error message
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('An error occurred while registering. Please try again later.');
    } finally {
      setLoading(false); // Set loading back to false after request completes
    }
  };

  const goBack = () => {
    navigate('/'); // Go back to the previous page
  };

  return (
    <>
      {loading && <Loading />} {/* Render the Loading component if loading is true */}
      <div style={{ position: 'absolute', top: '10rem', left:'50%', transform: 'translateX(-50%)', textAlign: 'center',  padding: '50px 100px', border: '1px solid #ccc', borderRadius: '15px' }}>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label className='select'>
            <select value={userType} onChange={handleUserTypeChange} >
              <option value="none">-- Select none</option>
              <option value="influencer">Influencer</option>
              <option value="startup-founder">Startup Founder</option>
            </select>
          </label>
          <div>
            <input type="text" placeholder="Name" value={Name} onChange={handleNameChange} style={{ padding: '8px', borderRadius: '5px', width: '100%', marginTop: '15px' }} />
          </div>
          <div>
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} style={{ padding: '8px', borderRadius: '5px', width: '100%', marginTop: '15px' }} />
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} style={{ padding: '8px', borderRadius: '5px', width: '100%', marginTop: '15px' }} />
          </div>
          <button type="submit" disabled={loading} style={{marginTop:'30px', backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            {loading ? 'Loading...' : 'Signup'}
          </button>
          <p style={{ marginTop: '50px' }}>Already have an account? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login</Link></p>
        </form>
        {errorMessage && <h3 style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</h3>}
      </div>
      <button style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', border: 'none', backgroundColor: 'red', color: '#fff' }} onClick={goBack}>Back</button>
    </>
  );
}

export default Signup;