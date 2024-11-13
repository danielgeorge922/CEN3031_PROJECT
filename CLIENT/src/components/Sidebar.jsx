import React, { useState } from 'react';
import { IconButton, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom'; // Assumes you're using react-router for navigation

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Function to handle profile click
  const handleProfileClick = () => {
    navigate('/profile'); // Replace with the actual profile link
  };

  // Function to open the logout modal
  const handleLogoutClick = () => {
    setOpen(true);
  };

  // Function to close the logout modal
  const handleClose = () => {
    setOpen(false);
  };

  // Function to confirm logout
  const handleConfirmLogout = () => {
    setOpen(false);
    navigate('/logout'); // Replace with the actual logout logic or URL
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-[80px] bg-zinc-100 flex flex-col justify-between items-center shadow-lg">
      {/* Profile Icon and Main Page (Dashboard) Icon in the same div */}
      <div className="flex flex-col items-center mt-4">
        <IconButton onClick={handleProfileClick} sx={{ mb: '10px' }}>
          <Avatar
            sx={{
              width: '50px',
              height: '50px',
              cursor: 'pointer',
            }}
            alt="User Profile"
          />
        </IconButton>

        <IconButton onClick={() => navigate('/main')} sx={{ color: '#2b6dd6' }}>
          <HomeIcon fontSize="large" />
        </IconButton>
      </div>

      {/* Sign Out Icon (at the bottom) */}
      <IconButton onClick={handleLogoutClick} sx={{ mb: '20px', color: 'red' }}>
        <ExitToAppIcon fontSize="large" />
      </IconButton>

      {/* Logout Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to log out?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="secondary">
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;
