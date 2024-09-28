import React, { useState } from "react";
import { Button, styled, TextField, InputAdornment } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";  // BACKEND: Axios is imported to handle API requests

const StyledTextField = styled(TextField)({
  margin: "1rem",
  width: "300px",
});

// Updated ValidationMessage style
const ValidationMessage = styled("p")({
  color: "gray",
  fontSize: "0.6rem",  // Smaller font size
  width: "300px",  // Same width as the text field
  textAlign: "left",  // Align text to the left
});

const SignUpForm = ({ handleClose, handleSignUp }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Regular expression for checking names (no special characters or spaces)
  const nameRegex = /^[A-Za-z]+$/;

  // Password validation rules: length > 8, must contain uppercase, lowercase, and a number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // Validate first and last name (must not contain special characters or spaces)
  const isValidFirstName = firstName && nameRegex.test(firstName);
  const isValidLastName = lastName && nameRegex.test(lastName);

  // Validate email (must end with '@ufl.edu')
  const isValidEmail = email && email.endsWith("@ufl.edu");

  // Validate password strength
  const isValidPassword = password && passwordRegex.test(password);

  // Validate password match
  const doPasswordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { firstName, lastName, email, password };

    try {
      const response = await axios.post("YOUR_BACKEND_API/signup", userData);
      console.log(response.data);  // Success message from the backend
      handleSignUp(userData);  // Signal success in the front-end
      handleClose();  // Close the form after successful submission
    } catch (error) {
      console.error("There was an error signing up the user:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
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
        <Button variant="contained" sx={{ margin: "2rem" }} onClick={handleClose}>
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
