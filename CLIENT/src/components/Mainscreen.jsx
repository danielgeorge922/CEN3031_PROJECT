import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Typography,
  LinearProgress,
  Box,
  IconButton,
  Avatar
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import QuestionCard from "./QuestionCard"; // Import the reusable component
import AddQuestionModal from "./AddQuestionModal";

// Example data for questions and classes
const exampleClasses = [
  "Math 101",
  "History 202",
  "Physics 303",
  "Chemistry 404",
  "Biology 505",
  "Computer Science 606",
  "English 707",
  "Psychology 808"
];

// Example questions data
const exampleQuestions = [
  {
    id: 1,
    text: "How do you solve this equation in Math 101?",
    class: "Math 101",
    answers: 3,
  },
  {
    id: 2,
    text: "What is the derivative of a function in Math 101?",
    class: "Math 101",
    answers: 4,
  },
  {
    id: 3,
    text: "How do you apply the quadratic formula in Math 101?",
    class: "Math 101",
    answers: 2,
  },

  {
    id: 4,
    text: "Can someone explain the history timeline from 1800 to 1900?",
    class: "History 202",
    answers: 2,
  },
  {
    id: 5,
    text: "What were the causes of World War I in History 202?",
    class: "History 202",
    answers: 5,
  },
  {
    id: 6,
    text: "What impact did the Renaissance have on modern history in History 202?",
    class: "History 202",
    answers: 3,
  },

  {
    id: 7,
    text: "What are the laws of thermodynamics in Physics 303?",
    class: "Physics 303",
    answers: 5,
  },
  {
    id: 8,
    text: "How does Newton’s third law apply in Physics 303?",
    class: "Physics 303",
    answers: 3,
  },
  {
    id: 9,
    text: "Can someone explain electromagnetism concepts in Physics 303?",
    class: "Physics 303",
    answers: 4,
  },

  {
    id: 10,
    text: "What are the basic principles of chemical bonding in Chemistry 404?",
    class: "Chemistry 404",
    answers: 3,
  },
  {
    id: 11,
    text: "How does the periodic table organize elements in Chemistry 404?",
    class: "Chemistry 404",
    answers: 4,
  },
  {
    id: 12,
    text: "Can someone explain the concept of moles in Chemistry 404?",
    class: "Chemistry 404",
    answers: 5,
  },

  {
    id: 13,
    text: "What is the structure of DNA in Biology 505?",
    class: "Biology 505",
    answers: 2,
  },
  {
    id: 14,
    text: "How does photosynthesis work in Biology 505?",
    class: "Biology 505",
    answers: 4,
  },
  {
    id: 15,
    text: "Can someone explain the theory of evolution in Biology 505?",
    class: "Biology 505",
    answers: 3,
  },

  {
    id: 16,
    text: "What are the basics of programming in Computer Science 606?",
    class: "Computer Science 606",
    answers: 3,
  },
  {
    id: 17,
    text: "Can someone explain data structures in Computer Science 606?",
    class: "Computer Science 606",
    answers: 5,
  },
  {
    id: 18,
    text: "How does recursion work in Computer Science 606?",
    class: "Computer Science 606",
    answers: 2,
  },

  {
    id: 19,
    text: "What are the major themes in Shakespeare’s works in English 707?",
    class: "English 707",
    answers: 4,
  },
  {
    id: 20,
    text: "Can someone explain the structure of a sonnet in English 707?",
    class: "English 707",
    answers: 3,
  },
  {
    id: 21,
    text: "How do you analyze literary symbols in English 707?",
    class: "English 707",
    answers: 5,
  },

  {
    id: 22,
    text: "What are the stages of cognitive development in Psychology 808?",
    class: "Psychology 808",
    answers: 4,
  },
  {
    id: 23,
    text: "Can someone explain the basics of behavioral conditioning in Psychology 808?",
    class: "Psychology 808",
    answers: 2,
  },
  {
    id: 24,
    text: "How does memory function in the brain in Psychology 808?",
    class: "Psychology 808",
    answers: 5,
  },
];

// Custom makeStyles for styling
const useStyles = makeStyles({
  classContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2rem",
    position: "relative",
  },
  classCard: {
    padding: "15px",
    margin: "0 10px",
    minWidth: "150px",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "15px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Poppins', sans-serif", // Apply Poppins font
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    },
  },
  selectedClassCard: {
    backgroundColor: "#6ea4fa", // Color for selected card
    color: "#ffffff", // White text for contrast
  },
  unselectedClassCard: {
    backgroundColor: "#3f51b5", // Default blue for unselected cards
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#5c6bc0", // Slightly lighter on hover
    },
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: "50%",
    border: "2px solid #3f51b5",
    padding: "0.5rem",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  leftArrow: {
    left: "-20px",
  },
  rightArrow: {
    right: "-20px",
  },
});

const GradientProgressBar = ({ value }) => {
  return (
    <Box sx={{ width: '100%', mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Progress Text and Bar */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            color: '#000', // Black text color
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            pb: '10px' // Center text within the box
          }}
        >
          Your Progress: {value}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: '12px', // Thicker bar
            borderRadius: '6px',
            backgroundColor: '#e0e0e0', // Background color for the track
            paddingTop: '8px', // Y-padding on top
            paddingBottom: '8px', // Y-padding on bottom
            '& .MuiLinearProgress-bar': {
              borderRadius: '6px',
              backgroundImage: 'linear-gradient(90deg, #4caf50, #81c784)', // Gradient for the progress bar
            },
          }}
        />
      </Box>

      {/* Enlarged Trophy Icon */}
      <Avatar
        sx={{
          bgcolor: 'gold',
          width: 60, // 100% larger (originally 30px, now 60px)
          height: 60,
          fontSize: 32, // Increase font size to fit larger icon
          boxShadow: '0 0 8px 4px rgba(255, 215, 0, 0.8), 0 0 12px 6px rgba(255, 215, 0, 0.5)',
          marginLeft: '16px', // Space between progress bar and icon
        }}
      >
        🏆
      </Avatar>
    </Box>
  );
};


const Mainscreen = () => {
  const classes = useStyles();
  const progressValue = 40;
  const [page, setPage] = useState(0);
  const [classesPerPage, setClassesPerPage] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false); // Dynamically set this based on screen size
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  // Function to handle window resizing
  const updateClassesPerPage = () => {
    const containerWidth = window.innerWidth - 40; // Assume 40px margin
    const cardWidth = 160; // Estimated width of each card (150px + margin)
    const cardsThatFit = Math.floor(containerWidth / cardWidth);
    setClassesPerPage(cardsThatFit);
  };
  const [selectedClass, setSelectedClass] = useState(null);
  const filteredQuestions = selectedClass
    ? exampleQuestions.filter((q) => q.class === selectedClass)
    : exampleQuestions;

  const handleClassSelect = (className) => {
    setSelectedClass(className === selectedClass ? null : className); // Toggle selection
  };
  // Listen for window resize to recalculate the number of classes that fit
  useEffect(() => {
    updateClassesPerPage(); // Initial calculation
    window.addEventListener("resize", updateClassesPerPage);

    return () => {
      window.removeEventListener("resize", updateClassesPerPage);
    };
  }, []);

  // Calculate start and end index for pagination
  const startIndex = page * classesPerPage;
  const endIndex = startIndex + classesPerPage;
  const pagedClasses = exampleClasses.slice(startIndex, endIndex);

  // Handle page navigation
  const handleNextPage = () => {
    if (endIndex < exampleClasses.length) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="p-6" style={{ background: "#f9f9f9", minHeight: "100vh" }}>

      <div className={classes.classContainer}>
        {/* Left Arrow for Previous */}
        {page > 0 && (
          <IconButton
            className={`${classes.arrowButton} ${classes.leftArrow}`}
            onClick={handlePrevPage}
          >
            <ArrowBackIosIcon sx={{ color: "black" }} />
          </IconButton>
        )}

        {/* Class Cards */}
        <div className="flex justify-center">
          {pagedClasses.map((className, index) => (
            <Card
              key={index}
              className={`${classes.classCard} ${
                selectedClass === className
                  ? classes.selectedClassCard
                  : classes.unselectedClassCard
              }`}
              onClick={() => handleClassSelect(className)}
            >
              <Typography>{className}</Typography>
            </Card>
          ))}
        </div>

        {/* Right Arrow for Next */}
        {endIndex < exampleClasses.length && (
          <IconButton
            className={`${classes.arrowButton} ${classes.rightArrow}`}
            onClick={handleNextPage}
          >
            <ArrowForwardIosIcon sx={{ color: "black" }} />
          </IconButton>
        )}
      </div>


      {/* Add a Question Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            sx={{
              backgroundColor: "#06c975",
              "&:hover": { backgroundColor: "#06c975" },
              fontWeight: "bold",
              borderRadius: "20px",
              padding: "8px 24px",
            }}
          >
          Add a Question
        </Button>
      </div>

      {/* Gradient Progress Bar */}
      <GradientProgressBar value={progressValue} />

      {/* Recent Questions */}
      {selectedClass && (
        <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "bold",
          backgroundColor: "#6ea4fa", // Similar to selected class card color
          color: "#ffffff",
          padding: "8px 16px",
          borderRadius: "15px",
          display: "inline-block",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Shadow effect
          mt: 3, // Margin-top for spacing
          mb: 3, // Margin-bottom for spacing
        }}
      >
        Questions for {selectedClass}
      </Typography>
      )}

      <div className="flex justify-center p-4 px-[100px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-center">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                text={question.text}
                className={question.class}
                answers={question.answers}
              />
            ))
          ) : (
            <Typography>No questions available for this class.</Typography>
          )}
        </div>
      </div>
      <AddQuestionModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Mainscreen;
