import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  TextField,
} from '@mui/material';
import AnswerCard from './AnswerCard';

const QuestionCardModal = ({ open, onClose, text, className }) => {
  // Dummy answers data for testing
  const answers = [
    {
      userProfile: { name: 'Alice Johnson', picture: undefined },
      text: 'This is a great question! Here’s my take on it...',
      upvotes: 5,
      downvotes: 2,
      replies: [
        { userProfile: { name: 'Bob Smith', picture: undefined }, text: 'I agree with this answer!' },
      ],
    },
    {
      userProfile: { name: 'Chris Evans', picture: undefined },
      text: 'I have a different perspective on this. Here’s what I think...',
      upvotes: 3,
      downvotes: 1,
      replies: [],
    },
    {
      userProfile: { name: 'Dana White', picture: undefined },
      text: 'Thank you for asking this! I think the answer is...',
      upvotes: 8,
      downvotes: 0,
      replies: [
        { userProfile: { name: 'Ellen Park', picture: undefined }, text: 'Very insightful, thank you!' },
        { userProfile: { name: 'Frank Lee', picture: undefined }, text: 'I learned a lot from this answer.' },
      ],
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          width: '90vw',
          height: '90vh',
        },
      }}
    >
      <DialogTitle>{className} - Question Details</DialogTitle>
      <DialogContent>
        {/* User Info Section with Default Values */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={undefined} // No src provided to show blank avatar
            alt="User Profile"
            sx={{ width: 50, height: 50, mr: 2 }}
          />
          <Typography variant="h6">Anonymous User</Typography> {/* Default name */}
        </Box>

        {/* Question Content */}
        <Typography variant="h6" gutterBottom>
          {text}
        </Typography>

        {/* Answers Section */}
        <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
          Answers
        </Typography>

        {/* Render answers */}
        {answers.length > 0 ? (
          answers.map((answer, index) => (
            <AnswerCard key={index} answer={answer} />
          ))
        ) : (
          <Typography variant="body2" sx={{ color: 'gray' }}>
            No answers yet.
          </Typography>
        )}

        {/* New Answer Input */}
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Add a new answer"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
          />
          <Button color="primary" variant="contained" sx={{ mt: 2 }}>
            Submit Answer
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionCardModal;
