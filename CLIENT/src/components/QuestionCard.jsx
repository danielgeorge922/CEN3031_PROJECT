import React, { useState } from 'react';
import {
  Card,
  Typography,
  IconButton,
  Avatar,
  Box,
  CircularProgress,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { styled } from '@mui/material/styles';
import QuestionCardModal from './QuestionCardModal';

const StyledCard = styled(Card)({
  width: '100%',
  padding: '1rem',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
  },
});

const getClassColor = (className) => {
  switch (className) {
    case 'Math 101': return '#1E40AF';
    case 'History 202': return '#3B82F6';
    case 'Physics 303': return '#6366F1';
    case 'Chemistry 404': return '#6D28D9';
    case 'Biology 505': return '#10B981';
    case 'Computer Science 606': return '#22C55E';
    case 'English 707': return '#EF4444';
    case 'Psychology 808': return '#F97316';
    default: return '#9e9e9e';
  }
};

const getPieColor = (percentage) => {
  if (percentage < 40) return '#f44336'; // Red
  if (percentage < 70) return '#ffeb3b'; // Yellow
  return '#4caf50'; // Green
};

const QuestionCard = ({ text, className, answers, profilePic, upvoteCount = 0, downvoteCount = 0 }) => {
  const [open, setOpen] = useState(false);
  const [upvotes, setUpvotes] = useState(upvoteCount);
  const [downvotes, setDownvotes] = useState(downvoteCount);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpvote = (event) => {
    event.stopPropagation();
    if (isUpvoted) {
      // If already upvoted, remove the upvote
      setUpvotes(upvotes - 1);
      setIsUpvoted(false);
    } else {
      // If not upvoted, add an upvote and remove any active downvote
      setUpvotes(upvotes + 1);
      setIsUpvoted(true);
      if (isDownvoted) {
        setDownvotes(downvotes - 1);
        setIsDownvoted(false);
      }
    }
  };

  const handleDownvote = (event) => {
    event.stopPropagation();
    if (isDownvoted) {
      // If already downvoted, remove the downvote
      setDownvotes(downvotes - 1);
      setIsDownvoted(false);
    } else {
      // If not downvoted, add a downvote and remove any active upvote
      setDownvotes(downvotes + 1);
      setIsDownvoted(true);
      if (isUpvoted) {
        setUpvotes(upvotes - 1);
        setIsUpvoted(false);
      }
    }
  };

  const totalVotes = upvotes + downvotes;
  const likePercentage = totalVotes > 0 ? (upvotes / totalVotes) * 100 : 0;
  const pieColor = getPieColor(likePercentage);

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

        <Typography sx={{ fontWeight: 'bold', cursor: 'pointer' }}>
          {text}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 1, color: 'gray' }}>
          Answers: {answers}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          {/* Upvote/Downvote Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleUpvote} sx={{ color: isUpvoted ? '#4caf50' : '#9e9e9e' }}>
              <ThumbUpIcon />
            </IconButton>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {upvotes}
            </Typography>
            <IconButton onClick={handleDownvote} sx={{ color: isDownvoted ? '#f44336' : '#9e9e9e' }}>
              <ThumbDownIcon />
            </IconButton>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {downvotes}
            </Typography>
          </Box>

          {/* Mini Pie Chart or Gray Circle if No Votes */}
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            {totalVotes > 0 ? (
              <>
                <CircularProgress
                  variant="determinate"
                  value={likePercentage}
                  size={40}
                  thickness={5}
                  sx={{ color: pieColor }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 'bold',
                    color: pieColor,
                  }}
                >
                  <Typography variant="caption" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                    {Math.round(likePercentage)}
                  </Typography>
                </Box>
              </>
            ) : (
              <>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={40}
                  thickness={5}
                  sx={{ color: '#9e9e9e' }} // Gray color for no votes
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 'bold',
                    color: '#9e9e9e',
                  }}
                >
                  <Typography variant="caption" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                    -
                  </Typography>
                </Box>
              </>
            )}
          </Box>
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
