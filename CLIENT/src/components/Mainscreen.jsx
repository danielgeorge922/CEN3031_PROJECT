import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Typography,
  LinearProgress,
  Box,
  IconButton,
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
  "Psychology 808",
  "Math 101",
  "History 202",
  "Physics 303",
  "Chemistry 404",
  "Biology 505",
  "Computer Science 606",
  "English 707",
  "Psychology 808",
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
  root: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
  },
  bar: ({ value }) => ({
    borderRadius: 5,
    background: `linear-gradient(90deg, #2b6dd6 0%, #9c64f4 ${value}%, #ff0000 100%)`,
    backgroundSize: `${value}% 100%`,
    transition: "all 0.5s ease-in-out",
  }),

  classContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2rem",
    position: "relative",
  },
  classCard: {
    padding: "10px",
    margin: "0 10px",
    minWidth: "150px",
    textAlign: "center",
    cursor: "pointer",
    background: "linear-gradient(45deg, #2b6dd6, #9c64f4)",
    color: "#ffffff",
    borderRadius: "12px",

    fontWeight: 500, // Semi-bold text
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      transform: "scale(1.05)",
      transition: "transform 0.2s ease-in-out",
    },
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: "50%",
    border: "2px solid black",
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
  hrLine: {
    borderTop: "2px solid black",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
});

const GradientProgressBar = ({ value }) => {
  const classes = useStyles({ value });

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography variant="h6" className="text-black">
        Your Progress: {value}%
      </Typography>
      <LinearProgress
        classes={{ root: classes.root, bar: classes.bar }}
        variant="determinate"
        value={value}
      />
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
      {/* Title Card */}
      {/* <Card className={classes.titleCard}>
        <Typography className={classes.titleText}>BrainBoosters</Typography>
      </Card> */}

      {/* Black Line Above */}
      <hr className={classes.hrLine} />

      {/* Horizontal Class Selector with Pagination */}
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
            <Card key={index} className={classes.classCard}>
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

      {/* Black Line Below */}
      <hr className={classes.hrLine} />

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
      <Typography variant="h6" className="mb-3 text-black">
        Recent Questions:
      </Typography>
      <div className="flex justify-center p-4 px-[100px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 items-center">
          {exampleQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              text={question.text}
              className={question.class}
              answers={question.answers}
            />
          ))}
        </div>
      </div>
      <AddQuestionModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Mainscreen;
