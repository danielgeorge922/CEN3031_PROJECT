import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  LinearProgress,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function Profile() {
  const [name, setName] = useState('John Doe');
  const [profilePic, setProfilePic] = useState(null);
  const [editing, setEditing] = useState(false);
  const [badgeProgress, setBadgeProgress] = useState(60); // Example progress

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <Box
      sx={{
        minHeight: '100%', // Full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#f3f4f6',
        p: 4
      }}
    >
      <Typography variant="h4" gutterBottom>
        Profile Page
      </Typography>

      {/* Profile Picture Section */}
      <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
        <Avatar
          src={profilePic}
          alt="Profile Picture"
          sx={{ width: 150, height: 150, mx: 'auto' }}
        />
        <IconButton
          component="label"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'white',
            '&:hover': { backgroundColor: 'gray' }
          }}
        >
          <UploadFileIcon />
          <input type="file" hidden accept="image/*" onChange={handleProfilePicChange} />
        </IconButton>
      </Box>

      {/* Name Editing Section */}
      <Box sx={{ my: 2 }}>
        {editing ? (
          <TextField
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            sx={{ mr: 2 }}
          />
        ) : (
          <Typography variant="h5">{name}</Typography>
        )}

        <IconButton onClick={toggleEditing} color="primary">
          {editing ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </Box>

      {/* Progress Bar Section */}
      <Box sx={{ mt: 4, textAlign: 'left', width: '100%', maxWidth: '400px' }}>
        <Typography variant="h6">Badge Progress</Typography>
        <LinearProgress
          variant="determinate"
          value={badgeProgress}
          sx={{ height: 10, borderRadius: 5, mt: 1 }}
        />
        <Typography variant="body2" sx={{ mt: 1 }}>
          {badgeProgress}% towards your next badge
        </Typography>
      </Box>

      {/* Buttons to Save or Cancel Changes */}
      {editing && (
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleEditing}
            sx={{ mr: 2 }}
          >
            Save Changes
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Profile;
