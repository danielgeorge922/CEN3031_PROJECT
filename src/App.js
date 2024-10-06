import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Mainpage from './pages/Mainpage';

function App() {
  return (
    <>
      <Router>
        <Navbar /> {/* If you want a navigation bar across pages */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/main" element={<Mainpage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

/**
 * INSTRUCTIONS FOR BACKEND TEAM:
 * 
 * 1. The "Sign Up" form is on the `Homepage` component.
 * 2. After the user fills out the sign-up form and they click the sign up button, make an API request to the part of the DB where we are storing all the user login info
 * 
 * BACKEND FUNCTIONALITY REQUIREMENTS:
 * 
 * 1. **Check if Email Exists in the Database**:
 *    - When the user submits their information (first name, last name, email, password), the backend should:
 *      a. Query the database to check if the provided email address already exists.
 *      b. If the email already exists in the database, return an error response to the frontend.
 *         Example Error Message: "Email already registered. Please use a different email."
 * 
 * 2. **Insert New User Information into the Database**:
 *    - If the email does NOT exist, the backend should:
 *      a. Hash the user's password for security (never store plain text passwords).
 *      b. Insert the new user record into the database with the following fields:
 *          - First Name
 *          - Last Name
 *          - Email (unique identifier)
 *          - Hashed Password
 *      c. Send a success response back to the frontend indicating that the sign-up was successful.
 * 
 * 3. **Handle Error Cases**:
 *    - If the database query fails for any reason (e.g., connection issues, invalid data), send a failure response to the frontend.
 *    - Ensure that meaningful error messages are sent back in case of failures so the frontend can display the appropriate feedback to the user.
 * 
 * Example Workflow (for reference):
 * 
 *    - Frontend sends a POST request with user data to `/api/signup`.
 *    - Backend checks if the email exists.
 *        - If yes, respond with 400 status code and a message like "Email already registered."
 *        - If no, hash the password, store the user in the database, and respond with 200 status code and success message.
 * 
 * 4. **API Endpoints**:
 *    - The API endpoint for sign-up could look something like this: `POST /api/signup`.
 *    - The frontend will expect JSON responses for both success and failure.
 */