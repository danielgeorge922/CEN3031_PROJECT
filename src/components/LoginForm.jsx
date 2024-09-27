import React, { useState } from "react";
import { Button, styled, TextField } from "@mui/material";

const StyledTextField = styled(TextField)({
  margin: "1rem",
  width: "300px",
});

const LoginForm = ({ handleClose, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass user data to the parent component or store it locally for later use
    const userData = { email, password };
    handleLogin(userData); // This would eventually send data to the backend

    handleClose(); // Close the form after submission
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
