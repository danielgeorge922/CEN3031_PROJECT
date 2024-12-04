import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const QuestionCardModal = ({ open, onClose, text, className, questionId }) => {
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // fetch answers for current question
  useEffect(() => {
    if (open && questionId) {
      const fetchAnswers = async () => {
        setLoading(true);
        try {
          const access_token = localStorage.getItem("token");
          const response = await axios.get(`http://127.0.0.1:8000/questions/questions/${questionId}/answers`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
          setAnswers(response.data);
        } catch (error) {
          console.error("Error fetching answers: ", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAnswers();
    }
  }, [open, questionId]);

  const handleAnswerSubmit = async () => {
    if (!newAnswer.trim()) return; // Prevent empty submissions
    try {
      setIsSubmitting(true);
      const access_token = localStorage.getItem('token');
      const payload = {
        question_id: questionId,
        text: newAnswer,
      };
      const response = await axios.post(`http://127.0.0.1:8000/questions/questions/${questionId}/answers`, payload, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const newAnswerData = response.data;

      setAnswers((prevAnswers) => [
        ...prevAnswers, {
          id: newAnswerData.id,
          text: newAnswerData.text,
          question_id: newAnswerData.question_id,
          user_id: newAnswerData.user_id,
        },
      ]);

      setNewAnswer(''); // Clear input field
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {loading ? (
          <Typography variant="body2" sx={{ color: 'gray' }}>
            Loading answers...
          </Typography>
        ) : answers.length > 0 ? (
          answers.map((answer) => (
            <AnswerCard
              key={answer.id}
              answer={{
                userProfile: { name: `User ${answer.user_id}`, picture: undefined },
                text: answer.text,
                upvotes: 0, // Default placeholder
                downvotes: 0, // Default placeholder
                replies: [], // Default placeholder
              }}
            />
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
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <Button
            color="primary"
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleAnswerSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Answer'}
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
