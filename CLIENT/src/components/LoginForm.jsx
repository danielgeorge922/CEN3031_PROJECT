import React, { useState, setError } from "react";
import { Button, styled, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const StyledTextField = styled(TextField)({
  margin: "1rem",
  width: "300px",
});

const LoginForm = ({ handleClose, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Add error state
  const [token, setToken] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before trying to log in

    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await axios.post("http://127.0.0.1:8000/users/login", formData);

      if (response.status === 200 || response.status === 201) {
        const { access_token } = response.data;
        localStorage.setItem('token', access_token); // Store token in localStorage
        alert('Logged in successfully');
        navigate('/main');
      }
    } catch (err) {
      // Handle errors
      if (err.response) {
        if (err.response.status === 400) {
          setError("Incorrect email or password.");
        } else if (err.response.status === 404) {
          setError("User not found.");
        } else {
          setError("Login failed. Please try again.");
        }
      } else {
        setError("An error occurred. Please check your network connection.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <StyledTextField
        label="Email"
        variant="filled"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledTextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      {/* Display error message if login fails */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <Button variant="contained" sx={{ margin: "2rem" }} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ margin: "2rem" }}
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;