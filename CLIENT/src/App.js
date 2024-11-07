import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Mainpage from './pages/Mainpage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <>
      <Router> {/* If you want a navigation bar across pages */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/main" element={<Mainpage />} />
          <Route path="/profile" element={<ProfilePage />} />
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
 * 2. After the user fills out the sign-up form and clicks the "Sign Up" button, make an API request to the part of the DB where we are storing all the user login info.
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
 * 
 * 5. **Backend Functionality for the Question Cards (`QuestionCard` and `QuestionCardModal`)**:
 *    - The `QuestionCard` component displays the question title, class name, answers, and allows upvoting/downvoting.
 *    - The `QuestionCardModal` component opens when the question title is clicked and shows more details about the question.
 * 
 * 6. **Database for Questions**:
 *    - Ensure there is a table in the database to store questions with the following fields:
 *      a. `id` (unique identifier)
 *      b. `text` (the question itself)
 *      c. `className` (the class associated with the question, e.g., Math 101)
 *      d. `answers` (number of answers the question has received)
 *      e. `profilePic` (URL for the user’s profile picture)
 *      f. `upvotes` (number of upvotes the question has received)
 *      g. `downvotes` (number of downvotes the question has received)
 * 
 * 7. **API Endpoints for Questions**:
 *    - Create the following endpoints to manage questions:
 *    
 *    a. **POST /api/questions**: 
 *        - This endpoint is used to add a new question to the database.
 *        - The frontend will send the `text`, `className`, and other necessary information when a new question is added.
 *        - Example data payload:
 *          ```
 *          {
 *            "text": "How do you solve this equation in Math 101?",
 *            "className": "Math 101",
 *            "profilePic": "https://link-to-profile-pic.com",
 *            "answers": 0
 *          }
 *          ```
 *        - On success, return a 200 response with the created question's details.
 *    
 *    b. **GET /api/questions**:
 *        - This endpoint will fetch all the questions from the database to be displayed in the `QuestionCard` component.
 *        - Example response:
 *          ```
 *          [
 *            {
 *              "id": 1,
 *              "text": "How do you solve this equation in Math 101?",
 *              "className": "Math 101",
 *              "answers": 3,
 *              "profilePic": "https://link-to-profile-pic.com",
 *              "upvotes": 10,
 *              "downvotes": 2
 *            },
 *            ...
 *          ]
 *          ```
 *    
 *    c. **PUT /api/questions/:id/upvote**:
 *        - This endpoint will handle upvoting a question.
 *        - When the user clicks the upvote button, send a PUT request to this endpoint with the question's `id`.
 *        - The backend should increment the `upvotes` count for the question in the database.
 *        - Example response:
 *          ```
 *          {
 *            "message": "Question upvoted successfully",
 *            "upvotes": 11
 *          }
 *          ```
 *    
 *    d. **PUT /api/questions/:id/downvote**:
 *        - This endpoint will handle downvoting a question.
 *        - When the user clicks the downvote button, send a PUT request to this endpoint with the question's `id`.
 *        - The backend should increment the `downvotes` count for the question in the database.
 *        - Example response:
 *          ```
 *          {
 *            "message": "Question downvoted successfully",
 *            "downvotes": 3
 *          }
 *          ```
 *    
 *    e. **GET /api/questions/:id**:
 *        - This endpoint fetches the details of a specific question (for the `QuestionCardModal`).
 *        - When the user clicks the question title, the frontend will send a GET request to this endpoint with the question's `id`.
 *        - The backend should return the full details of the question, including additional information if available.
 *        - Example response:
 *          ```
 *          {
 *            "id": 1,
 *            "text": "How do you solve this equation in Math 101?",
 *            "className": "Math 101",
 *            "answers": [
 *              "Answer 1",
 *              "Answer 2"
 *            ],
 *            "upvotes": 10,
 *            "downvotes": 2,
 *            "profilePic": "https://link-to-profile-pic.com"
 *          }
 *          ```
 * 
 * 8. **Error Handling for Question Endpoints**:
 *    - If the database query fails for any reason or if the question `id` is not found, return an appropriate error message and status code (e.g., 404 for "Question not found").
 */