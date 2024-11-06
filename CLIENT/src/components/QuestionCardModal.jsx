import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

const QuestionCardModal = ({ open, onClose, text, className, answers }) => {
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
        <Typography variant="h6" gutterBottom>
          {text}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          Answers: {answers}
        </Typography>
        {/* Additional content or answers can go here */}
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
