import React, { useState } from 'react';
import { Card, Typography, IconButton, Avatar, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { makeStyles } from '@mui/styles';

// Custom styles using makeStyles for hover effect and modal
const useStyles = makeStyles({
  questionTitle: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    '&:hover': {
      color: '#1e90ff',  // Change color to blue on hover
      textDecoration: 'underline',  // Underline on hover
    },
  },
  customDialog: {
    width: '90vw',  // 90% width of the viewport
    height: '90vh',  // 90% height of the viewport
    maxWidth: 'none',  // Override default maxWidth to allow custom size
    padding: '2rem',  // Add padding inside the modal
  },
});

const QuestionCard = ({ text, className, answers, profilePic, onUpvote, onDownvote }) => {
  const [open, setOpen] = useState(false);  // State to control the modal
  const classes = useStyles();  // Use the custom styles

  const handleOpen = () => {
    setOpen(true);  // Open modal
  };

  const handleClose = () => {
    setOpen(false);  // Close modal
  };

  return (
    <>
      {/* Question Card */}
      <Card className="flex p-4 mb-4 bg-white text-black" sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Avatar for Profile Picture */}
        <Avatar src={profilePic} alt="Profile Picture" sx={{ mr: 2 }} />

        {/* Box to wrap the text content */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Clickable Question Text with hover effect */}
          <Typography onClick={handleOpen} className={classes.questionTitle}>
            {text}
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 1, color: 'gray' }}>
            Class: {className} | Answers: {answers}
          </Typography>
        </Box>

        {/* Upvote/Downvote Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={onUpvote} sx={{ color: '#4caf50' }}> {/* Upvote Button */}
            <ThumbUpIcon />
          </IconButton>

          <IconButton onClick={onDownvote} sx={{ color: '#f44336' }}> {/* Downvote Button */}
            <ThumbDownIcon />
          </IconButton>
        </Box>
      </Card>

      {/* Modal (Dialog) with 90% width and height */}
      <Dialog open={open} onClose={handleClose} PaperProps={{ className: classes.customDialog }}>
        <DialogTitle>Question Details</DialogTitle>
        <DialogContent>
          <Typography>{text}</Typography>
          <Typography variant="subtitle2" sx={{ mt: 1, color: 'gray' }}>
            Class: {className} | Answers: {answers}
          </Typography>
          {/* You can add more detailed content here, like additional answers or comments */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionCard;
