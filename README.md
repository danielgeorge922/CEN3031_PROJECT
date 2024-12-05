# BrainBoosters

## Project Overview
BrainBoosters is a collaborative platform that fosters student engagement and peer-to-peer learning. It enables students to connect by asking and answering questions, creating a supportive environment for shared knowledge and growth.

## Features
- **Account Creation and Login**: Securely create a new account or login.
- **Ask Questions**: Post questions for the other students to answer or post questions with the answer itself.
- **Answer Question**: Provide answers to previously asked questions.
- **Like/Dislike Answers**: Rate answers based on their accuracies.
- **Progress Tracking**: Visualize personal progress based on your posted questions and answers

## Technical Details
### Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: FastAPI
- **Database**: PostgreSQL
- **Infrastructure**: AWS
- **Authentiction**: JSON Web Token (JWT)


## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- Python

### Steps
1. Clone the repository

   ```bash
   git clone https://github.com/danielgeorge922/CEN3031_PROJECT.git
   cd CEN3031_PROJECT
3. Install dependencies

    ```bash
    npm install
    pip install -r requirements.txt

4. Start the server
   
   ```bash
   cd SERVER
   fastapi dev app/main.py
   
5. Start the client

    ```bash
    cd CLIENT   
    npm start

