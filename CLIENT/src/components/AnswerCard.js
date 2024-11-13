import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  CircularProgress,
  TextField
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyCard from './ReplyCard';

const AnswerCard = ({ answer }) => {
  const [upvotes, setUpvotes] = useState(answer.upvotes || 0);
  const [downvotes, setDownvotes] = useState(answer.downvotes || 0);
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);

  const totalVotes = upvotes + downvotes;
  const likePercentage = totalVotes > 0 ? (upvotes / totalVotes) * 100 : 0;
  const pieColor = likePercentage < 40 ? '#f44336' : likePercentage < 70 ? '#ffeb3b' : '#4caf50';

  const handleUpvote = () => setUpvotes(upvotes + 1);
  const handleDownvote = () => setDownvotes(downvotes + 1);
  const handleReplySubmit = () => {
    // Add reply to answer (actual implementation will vary)
    setShowReplyInput(false);
    setReplyText('');
  };

  return (
    <Box sx={{ mb: 3, p: 2, borderRadius: 2, boxShadow: 1, backgroundColor: '#f9f9f9' }}>
      {/* Top Row with Avatar, Name, and Enlarged Pie Chart */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={answer.userProfile.picture} sx={{ width: 30, height: 30, mr: 2 }} />
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{answer.userProfile.name}</Typography>
        </Box>

        {/* Enlarged Vote Percentage Pie Chart */}
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={likePercentage}
            size={45} // 50% larger than original size (30 * 1.5 = 45)
            thickness={5}
            sx={{ color: pieColor }}
          />
          <Box sx={{
            top: 0, left: 0, bottom: 0, right: 0,
            position: 'absolute', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: pieColor
          }}>
            <Typography variant="caption">{totalVotes > 0 ? Math.round(likePercentage) : '-'}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Answer Text */}
      <Typography variant="body2" sx={{ mb: 1 }}>{answer.text}</Typography>

      {/* Upvote/Downvote Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <IconButton onClick={handleUpvote} sx={{ color: '#4caf50' }}>
          <ThumbUpIcon />
        </IconButton>
        <Typography variant="body2" sx={{ mr: 2 }}>{upvotes}</Typography>
        <IconButton onClick={handleDownvote} sx={{ color: '#f44336' }}>
          <ThumbDownIcon />
        </IconButton>
        <Typography variant="body2">{downvotes}</Typography>
      </Box>

      {/* Replies */}
      <Box sx={{ mt: 2 }}>
        {answer.replies.map((reply, index) => (
          <ReplyCard key={index} reply={reply} />
        ))}
      </Box>

      {/* Reply Input */}
      {showReplyInput ? (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Write a reply..."
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <Button onClick={handleReplySubmit} color="primary" variant="contained" sx={{ mt: 1 }}>
            Submit Reply
          </Button>
        </Box>
      ) : (
        <Button onClick={() => setShowReplyInput(true)} sx={{ mt: 1 }} color="primary">
          Reply
        </Button>
      )}
    </Box>
  );
};

export default AnswerCard;
