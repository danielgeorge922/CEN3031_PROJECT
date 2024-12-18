import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Snackbar,
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

const AddQuestionModal = ({ open, onClose, onQuestionSubmitted }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [question, setQuestion] = useState("");
  const [classOptions, setClassOptions] = useState([]); // Holds classes fetched from the API
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => setSnackbarOpen(false);

  useEffect(() => {
    // Fetch classes from the API
    const fetchClasses = async () => {
      try {
        const access_token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/classes/classes", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setClassOptions(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  const isQuestionValid = question.length > 10; // Example validation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedClassObject = classOptions.find(
      (cls) => cls.name === selectedClass
    );

    if (selectedClassObject && isQuestionValid) {
      try {
        const access_token = localStorage.getItem("token");

        const userInfo = await axios.get("http://127.0.0.1:8000/users/me", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const data = {
          class_id: selectedClassObject.id, // Use the id from the selected class
          title: `${userInfo.data.first_name} ${userInfo.data.last_name}`, // fetch name and use it
          text: question,
        };

        const response = await axios.post("http://127.0.0.1:8000/questions/questions", data, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        console.log("Question submitted successfully:", response.data);
        if (onQuestionSubmitted) onQuestionSubmitted(); // Trigger main screen refresh
        onClose();
      } catch (error) {
        console.error("Error submitting question:", error);
        setSnackbarMessage("Failed to submit the question.");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("Please select a class and enter a valid question.");
      setSnackbarOpen(true);
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
          {classOptions.map((classOption) => (
            <MenuItem key={classOption.id} value={classOption.name}>
              {classOption.name}
            </MenuItem>
          ))}
        </StyledTextField>
        <ValidationMessage>Please select a class.</ValidationMessage>
  
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
  
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Dialog>
  );  
};

export default AddQuestionModal;
