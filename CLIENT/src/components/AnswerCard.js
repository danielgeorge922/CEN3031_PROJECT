import React, { useState } from 'react';
import axios from "axios";
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
  const [upvoted, setUpvoted] = useState(answer.upvoted);
  const [downvoted, setDownvoted] = useState(answer.downvoted);
  const [upvotes, setUpvotes] = useState(answer.upvotes);
  const [downvotes, setDownvotes] = useState(answer.downvotes);
  // const [replyText, setReplyText] = useState('');
  // const [showReplyInput, setShowReplyInput] = useState(false);

  const totalVotes = upvotes + downvotes;
  const likePercentage = totalVotes > 0 ? (upvotes / totalVotes) * 100 : 0;
  const pieColor = likePercentage < 40 ? '#f44336' : likePercentage < 70 ? '#ffeb3b' : '#4caf50';

  const handleUpvote = async () => {
    try {
      const access_token = localStorage.getItem("token");
      if (upvoted) {
        setUpvotes(upvotes - 1);
        setUpvoted(false);
        await axios.put(`http://127.0.0.1:8000/questions/answers/${answer.id}/unlike`, {}, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
      } else {
        setUpvotes(upvotes + 1);
        if (downvoted) {
          setDownvotes(downvotes - 1);
          setDownvoted(false);
        }
        setUpvoted(true);
        await axios.put(`http://127.0.0.1:8000/questions/answers/${answer.id}/like`, {}, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
      }
    } catch(error) {
      console.error("Error liking answer", error);
    }
  };

  const handleDownvote = async () => {
    try {
      const access_token = localStorage.getItem("token");
      if (downvoted) {
        setDownvotes(downvotes - 1);
        setDownvoted(false);
        await axios.put(`http://127.0.0.1:8000/questions/answers/${answer.id}/undislike`, {}, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
      } else {
        setDownvotes(downvotes + 1);
        if (upvoted) {
          setUpvotes(upvotes - 1);
          setUpvoted(false);
        }
        setDownvoted(true);
        await axios.put(`http://127.0.0.1:8000/questions/answers/${answer.id}/dislike`, {}, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
      }
    } catch (error) {
      console.error("Error disliking answer", error);
    }
  };

  // const handleReplySubmit = () => {
  //   setShowReplyInput(false);
  //   setReplyText('');
  // };

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
            size={45}
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
        <IconButton onClick={handleUpvote} sx={{ color: upvoted ? '#4caf50' : 'gray' }}>
          <ThumbUpIcon />
        </IconButton>
        <Typography variant="body2" sx={{ mr: 2 }}>{upvotes}</Typography>
        <IconButton onClick={handleDownvote} sx={{ color: downvoted ? '#f44336' : 'gray' }}>
          <ThumbDownIcon />
        </IconButton>
        <Typography variant="body2">{downvotes}</Typography>
      </Box>

      {/* Replies */}
      {/* <Box sx={{ mt: 2 }}>
        {answer.replies.map((reply, index) => (
          <ReplyCard key={index} reply={reply} />
        ))}
      </Box> */}

      {/* Reply Input */}
      {/* {showReplyInput ? (
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
      )} */}
    </Box>
  );
};

export default AnswerCard;
