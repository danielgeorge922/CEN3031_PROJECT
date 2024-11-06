import React, { useState } from 'react';
import {
  Card,
  Typography,
  IconButton,
  Avatar,
  Box,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { styled } from '@mui/material/styles';
import QuestionCardModal from './QuestionCardModal'; // Import the new modal component

const StyledCard = styled(Card)({
  width: '100%', // Take up the width of the container
  padding: '1rem',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for paper effect
  transition: 'transform 0.2s ease-in-out', // Smooth transition for scaling
  cursor: 'pointer', // Change cursor to pointer on hover
  '&:hover': {
    transform: 'scale(1.05)', // Scale up slightly on hover
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)', // Slightly larger shadow on hover
  },
});

const getClassColor = (className) => {
  switch (className) {
    case 'Math 101':
      return '#1E40AF'; // Blue for Math 101
    case 'History 202':
      return '#3B82F6'; // Lighter Blue for History 202
    case 'Physics 303':
      return '#6366F1'; // Indigo for Physics 303
    case 'Chemistry 404':
      return '#6D28D9'; // Purple for Chemistry 404
    case 'Biology 505':
      return '#10B981'; // Green for Biology 505
    case 'Computer Science 606':
      return '#22C55E'; // Light Green for Computer Science 606
    case 'English 707':
      return '#EF4444'; // Red for English 707
    case 'Psychology 808':
      return '#F97316'; // Orange for Psychology 808
    default:
      return '#9e9e9e'; // Gray for other classes
  }
};

const QuestionCard = ({ text, className, answers, profilePic, upvoteCount = 0, downvoteCount = 0 }) => {
  const [open, setOpen] = useState(false);
  const [upvotes, setUpvotes] = useState(upvoteCount);
  const [downvotes, setDownvotes] = useState(downvoteCount);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpvote = (event) => {
    event.stopPropagation();
    setUpvotes(upvotes + 1);
  };

  const handleDownvote = (event) => {
    event.stopPropagation();
    setDownvotes(downvotes + 1);
  };

  return (
    <>
      <StyledCard onClick={handleOpen}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={profilePic} alt="User Profile" sx={{ width: 40, height: 40, mr: 2 }} />
          <Box
            sx={{
              backgroundColor: getClassColor(className),
              color: 'white',
              padding: '0.3rem 0.8rem',
              borderRadius: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {className}
          </Box>
        </Box>

        <Typography
          sx={{
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {text}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 1, color: 'gray' }}>
          Answers: {answers}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <IconButton onClick={handleUpvote} sx={{ color: '#4caf50' }}>
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {upvotes}
          </Typography>
          <IconButton onClick={handleDownvote} sx={{ color: '#f44336' }}>
            <ThumbDownIcon />
          </IconButton>
          <Typography variant="body2">
            {downvotes}
          </Typography>
        </Box>
      </StyledCard>

      {/* QuestionCardModal Component */}
      <QuestionCardModal
        open={open}
        onClose={handleClose}
        text={text}
        className={className}
        answers={answers}
      />
    </>
  );
};

export default QuestionCard;
