import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogContent } from '@mui/material';
import SignUpForm from './SignUpForm';  // Assuming the SignUpForm is in the components folder
import hero_bg from '../assets/hero_bg.jpg';  // Import the background image

const Hero = () => {
  // Local state to manage the sign-up modal
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // Functions to open/close the sign-up modal
  const handleSignUpOpen = () => setIsSignUpOpen(true);
  const handleSignUpClose = () => setIsSignUpOpen(false);

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-center"
      style={{ backgroundImage: `url(${hero_bg})` }}  // Setting background image
    >
      {/* White grid container with rounded edges */}
      <div className="bg-white bg-opacity-90 rounded-lg p-8 max-w-xl">
        {/* Main Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to BrainBoosters
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-8">
          Enhance your learning experience with collaborative Q&A, progress tracking, and gamified incentives. Join BrainBoosters today and make learning fun!
        </p>

        {/* Call to Action Buttons */}
        <div className="space-x-4">
          
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ backgroundColor: '#2b6dd6', '&:hover': { backgroundColor: '#89b5fa' } }}
            onClick={handleSignUpOpen}  // Open sign-up modal
          >
            Get Started
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{ color: '#2b6dd6', borderColor: '#2b6dd6', '&:hover': { borderColor: '#89b5fa', color: '#89b5fa' } }}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Sign Up Modal */}
      <Dialog open={isSignUpOpen} onClose={handleSignUpClose}>
        <DialogContent>
          <SignUpForm handleClose={handleSignUpClose} />  {/* Sign Up Form */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Hero;
