import axios from "axios";
import React, { useState } from "react";
import { Button, styled, TextField, InputAdornment } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom


const StyledTextField = styled(TextField)({
  margin: "1rem",
  width: "300px",
});

const ValidationMessage = styled("p")({
  color: "gray",
  fontSize: "0.6rem",  
  width: "300px",  
  textAlign: "left",  
});

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();  // Initialize navigate

  const nameRegex = /^[A-Za-z]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const isValidFirstName = firstName && nameRegex.test(firstName);
  const isValidLastName = lastName && nameRegex.test(lastName);
  const isValidEmail = email && email.endsWith("@ufl.edu");
  const isValidPassword = password && passwordRegex.test(password);
  const doPasswordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isValidFirstName && isValidLastName && isValidEmail && isValidPassword && doPasswordsMatch) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/users/register", {
          email: email,
          password: password,
        });
  
        if (response.status === 200 || response.status === 201) {
          alert('Account created successfully!');
          navigate('/main');
        } else {
          // Handle unexpected status codes here
          alert("Unexpected error occurred. Please try again.");
        }
      } catch (error) {
        // Display the error message returned by the backend
        if (error.response && error.response.status === 400) {
          alert(error.response.data.detail || "User already registered.");
        } else {
          alert("Error occurred during signup. Please try again.");
        }
      }
    } else {
      alert("Please ensure all form fields are valid.");
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
        padding: "1.5rem",
      }}
    >
      {/* First Name Field */}
      <StyledTextField
        label="First Name"
        variant="filled"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        InputProps={{
          endAdornment: firstName && (
            <InputAdornment position="end">
              {isValidFirstName ? (
                <CheckIcon style={{ color: "green" }} />
              ) : (
                <CloseIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
      />
      <ValidationMessage>First name must not contain special characters or spaces.</ValidationMessage>

      {/* Last Name Field */}
      <StyledTextField
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        InputProps={{
          endAdornment: lastName && (
            <InputAdornment position="end">
              {isValidLastName ? (
                <CheckIcon style={{ color: "green" }} />
              ) : (
                <CloseIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
      />
      <ValidationMessage>Last name must not contain special characters or spaces.</ValidationMessage>

      {/* Email Field */}
      <StyledTextField
        label="Email"
        variant="filled"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          endAdornment: email && (
            <InputAdornment position="end">
              {isValidEmail ? (
                <CheckIcon style={{ color: "green" }} />
              ) : (
                <CloseIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
      />
      <ValidationMessage>Email must contain @ufl.edu.</ValidationMessage>

      {/* Password Field */}
      <StyledTextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {password && isValidPassword ? (
                <CheckIcon style={{ color: "green" }} />
              ) : password ? (
                <CloseIcon style={{ color: "red" }} />
              ) : null}
            </InputAdornment>
          ),
        }}
      />
      <ValidationMessage>Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, and a number.</ValidationMessage>

      {/* Confirm Password Field */}
      <StyledTextField
        label="Confirm Password"
        variant="filled"
        type="password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {confirmPassword && doPasswordsMatch ? (
                <CheckIcon style={{ color: "green" }} />
              ) : confirmPassword ? (
                <CloseIcon style={{ color: "red" }} />
              ) : null}
            </InputAdornment>
          ),
        }}
      />
      <ValidationMessage>Passwords must match.</ValidationMessage>

      <div>
        <Button variant="contained" sx={{ margin: "2rem" }} onClick={() => navigate('/')}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ margin: "2rem" }}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
