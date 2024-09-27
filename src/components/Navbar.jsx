import React, { useState } from 'react';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Dialog, DialogContent } from '@mui/material';
import LoginForm from './LoginForm';   // Import LoginForm component
import SignUpForm from './SignUpForm'; // Import SignUpForm component

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);    // State to manage login modal
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);  // State to manage signup modal

  // Toggle the mobile menu
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Functions to open/close login and sign-up modals
  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);

  const handleSignUpOpen = () => setIsSignUpOpen(true);
  const handleSignUpClose = () => setIsSignUpOpen(false);

  return (
    <div className="w-screen h-[80px] z-10 bg-zinc-100 fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <PsychologyIcon className="text-pink-500 ml-1" />
          <h1 className="text-1xl font-bold sm:text-2xl font-sans">BRAINBOOSTERS</h1>
          <ul className="hidden md:flex">
            <li>Home</li>
            <li>About</li>
            <li>Support</li>
          </ul>
        </div>



        {/* Custom Styled Buttons */}
        <div className="hidden md:flex pr-4">



          <Button 
            variant="contained"
            sx={{
              backgroundColor: '#2b6dd6',
              color: 'white',
              '&:hover': { backgroundColor: '#89b5fa' },
              mr: '10px',
            }}
            onClick={handleSignUpOpen} // Opens signup modal
          >
            Sign Up
          </Button>




          <Button 
            variant="contained"
            sx={{
              backgroundColor: '#2b6dd6',
              color: 'white',
              '&:hover': { backgroundColor: '#89b5fa' },
              mr: '10px',
            }}
            onClick={handleLoginOpen} // Opens login modal
          >
            Login
          </Button>



        </div>

        <div className="md:hidden" onClick={handleMenuToggle}>
          <MenuIcon className="w-5" />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-gray-300 w-full p-4">
          <li>Home</li>
          <li>About</li>
          <li>Support</li>
        </ul>
      )}

      {/* Login Modal */}
      <Dialog open={isLoginOpen} onClose={handleLoginClose}>
        <DialogContent>
          <LoginForm handleClose={handleLoginClose} />
        </DialogContent>
      </Dialog>

      {/* Sign Up Modal */}
      <Dialog open={isSignUpOpen} onClose={handleSignUpClose}>
        <DialogContent>
          <SignUpForm handleClose={handleSignUpClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
