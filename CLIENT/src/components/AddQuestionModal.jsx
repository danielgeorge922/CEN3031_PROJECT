import React, { useState } from "react";
import {
  Button,
  styled,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const StyledTextField = styled(TextField)({
  margin: "1rem",
  width: "300px",
});

const ValidationMessage = styled("p")({
  color: "gray",
  fontSize: "0.6rem",
  width: "300px",
  textAlign: "left",
});

const AddQuestionModal = ({ open, onClose, onSubmit }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [question, setQuestion] = useState("");

  // Example list of classes
  const classOptions = [
    "Math 101",
    "History 202",
    "Physics 303",
    "Chemistry 404",
    "Biology 505",
    "Computer Science 606",
    "English 707",
    "Psychology 808",
  ];

  const isQuestionValid = question.length > 10; // Example validation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClass && isQuestionValid) {
      onSubmit({ class: selectedClass, question });
      onClose();
    } else {
      alert("Please select a class and enter a valid question.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add a New Question</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Class Dropdown */}
        <StyledTextField
          select
          label="Select Class"
          variant="filled"
          required
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          InputProps={{
            endAdornment: (
              <Box sx={{ ml: "-90px", display: "flex", alignItems: "center" }}>
                {selectedClass ? (
                  <CheckIcon style={{ color: "green" }} />
                ) : (
                  <CloseIcon style={{ color: "red" }} />
                )}
              </Box>
            ),
          }}
        >
          {classOptions.map((classOption, index) => (
            <MenuItem key={index} value={classOption}>
              {classOption}
            </MenuItem>
          ))}
        </StyledTextField>
        <ValidationMessage>Please select a class.</ValidationMessage>

        {/* Question Input Field */}
        <StyledTextField
          label="Enter Your Question"
          variant="filled"
          required
          multiline
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          InputProps={{
            endAdornment:
              question && isQuestionValid ? (
                <CheckIcon style={{ color: "green" }} />
              ) : question ? (
                <CloseIcon style={{ color: "red" }} />
              ) : null,
          }}
        />
        <ValidationMessage>
          Question should be at least 10 characters.
        </ValidationMessage>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit Question
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddQuestionModal;
