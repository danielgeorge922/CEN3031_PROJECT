import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  LinearProgress,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import "@fontsource/poppins"; // Defaults to weight 400


function Profile() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [profilePic, setProfilePic] = useState(null);
  const [editing, setEditing] = useState(false);
  const [badgeProgress, setBadgeProgress] = useState(60); // Example progress

  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const toggleEditing = () => setEditing(!editing);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {/* Left Container - Profile Info */}
        <Paper
          sx={{
            flex: 1,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Profile
          </Typography>

          <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
            <Avatar
              src={profilePic}
              alt="Profile Picture"
              sx={{ width: 120, height: 120 }}
            />
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                "&:hover": { backgroundColor: "gray" },
              }}
            >
              <UploadFileIcon />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            {editing ? (
              <>
                <TextField
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={handleLastNameChange}
                  fullWidth
                />
              </>
            ) : (
              <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
            )}
            <IconButton
              onClick={toggleEditing}
              color="primary"
              sx={{ alignSelf: "center" }}
            >
              {editing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </Box>

          {editing && (
            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={toggleEditing}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Paper>

        {/* Right Container - Progress Section */}
        <Paper
          sx={{
            flex: 1,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            My Progress
          </Typography>

          {/* Badges Section */}
          <Box
            sx={{
              width: "100%",
              mb: 2,
              display: "flex",
              justifyContent: "space-around",
              gap: 1,
              flexWrap: "wrap",
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <Avatar sx={{ bgcolor: "gold", width: 50, height: 50 }}>🏆</Avatar>
            <Avatar sx={{ bgcolor: "silver", width: 50, height: 50 }}>
              🎖️
            </Avatar>
            <Avatar sx={{ bgcolor: "bronze", width: 50, height: 50 }}>
              🥉
            </Avatar>
          </Box>

          {/* Progress Bar Section */}
          <Box sx={{ width: "100%", textAlign: "center", fontFamily: "Poppins, sans-serif" }}>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Poppins, sans-serif" }}>
              Progress Towards Next Badge
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={badgeProgress}
                sx={{ height: 10, borderRadius: 5, width: "80%" }}
              />
              <Avatar
                sx={{bgcolor: "gold",width: 30,height: 30,fontSize: 16,boxShadow: "0 0 8px 4px rgba(255, 215, 0, 0.8), 0 0 12px 6px rgba(255, 215, 0, 0.5)",
                }}
              >
                🏆
              </Avatar>
            </Box>
            
            <Typography variant="body2" sx={{ mt: 1, fontFamily: "Poppins, sans-serif" }}>
              {badgeProgress}% completed
            </Typography>
          </Box>

          <div className="flex flex-col gap-4 pt-7">
          {/* Badge for +1 */}
          <div className="flex items-center">
            <div className="flex items-center bg-yellow-600 justify-center text-white rounded-full px-3 py-2">
              <span className="text-xl font-bold mr-1.5">+</span>
              <p className="font-bold">1</p>
            </div>
            <p className="ml-4">Dummy text for +1 badge</p>
          </div>

          {/* Badge for +2 */}
          <div className="flex items-center">
            <div className="flex items-center bg-blue-600 justify-center text-white rounded-full px-3 py-2">
              <span className="text-xl font-bold mr-1.5">+</span>
              <p className="font-bold">2</p>
            </div>
            <p className="ml-4">Dummy text for +2 badge</p>
          </div>

          {/* Badge for +3 */}
          <div className="flex items-center">
            <div className="flex items-center bg-green-600 justify-center text-white rounded-full px-3 py-2">
              <span className="text-xl font-bold mr-1.5">+</span>
              <p className="font-bold">3</p>
            </div>
            <p className="ml-4">Dummy text for +3 badge</p>
          </div>
        </div>



        </Paper>
      </Box>
    </Box>
  );
}

export default Profile;
