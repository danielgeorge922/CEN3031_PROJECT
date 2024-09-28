import React from 'react';
import { IconButton, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-[80px] bg-zinc-100 flex flex-col justify-between items-center shadow-lg">
      {/* Profile Icon and Main Page (Dashboard) Icon in the same div */}
      <div className="flex flex-col items-center mt-4">
        <IconButton sx={{ mb: '10px' }}>
          <Avatar
            sx={{
              width: '50px',
              height: '50px',
              cursor: 'pointer',
            }}
            alt="User Profile"
          />
        </IconButton>

        <IconButton sx={{ color: '#2b6dd6' }}>
          <HomeIcon fontSize="large" />
        </IconButton>
      </div>

      {/* Sign Out Icon (at the bottom) */}
      <IconButton
        sx={{
          mb: '20px',
          color: 'red',
        }}
      >
        <ExitToAppIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default Sidebar;
