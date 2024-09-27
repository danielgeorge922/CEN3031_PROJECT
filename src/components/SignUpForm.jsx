import React, { useState } from "react";
import { Button, styled, TextField, InputAdornment } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";  // BACKEND: Axios is imported to handle API requests

const StyledTextField = styled(TextField)({
  margin: "1rem",
  width: "300px",
});

const SignUpForm = ({ handleClose, handleSignUp }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Regular expression for checking names (no special characters or spaces)
  const nameRegex = /^[A-Za-z]+$/;

  // Validate first and last name (must not contain special characters or spaces)
  const isValidFirstName = firstName && nameRegex.test(firstName);
  const isValidLastName = lastName && nameRegex.test(lastName);

  // Validate email (must end with '@ufl.edu')
  const isValidEmail = email && email.endsWith("@ufl.edu");

  // Validate password match
  const doPasswordsMatch = password && confirmPassword && password === confirmPassword;

  // Password should just check for any input (length > 0)
  const isValidPassword = password && password.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // BACKEND: Ensure the backend checks if a user with this email already exists in the database.
    // If the user exists, return an appropriate error message.
    // If the user does not exist, proceed to save the user in the database.
    const userData = { firstName, lastName, email, password };

    try {
      // BACKEND: Use Axios to send this userData to the backend API for user registration.
      const response = await axios.post("YOUR_BACKEND_API/signup", userData);

      // BACKEND: Return a success message if the user is created successfully.
      // Handle success response
      console.log(response.data);  // Success message from the backend

      handleSignUp(userData);  // Signal success in the front-end
      handleClose();  // Close the form after successful submission

    } catch (error) {
      // BACKEND: Handle errors (such as if the user already exists or any other issues).
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
        padding: "2rem",
      }}
    >
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
      <StyledTextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: password && (
            <InputAdornment position="end">
              {isValidPassword ? (
                <CheckIcon style={{ color: "green" }} />
              ) : (
                <CloseIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
      />
      <StyledTextField
        label="Confirm Password"
        variant="filled"
        type="password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputProps={{
          endAdornment: confirmPassword && (
            <InputAdornment position="end">
              {doPasswordsMatch ? (
                <CheckIcon style={{ color: "green" }} />
              ) : (
                <CloseIcon style={{ color: "red" }} />
              )}
            </InputAdornment>
          ),
        }}
      />

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
