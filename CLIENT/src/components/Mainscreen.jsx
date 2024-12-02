import React, { useState, useEffect } from "react";
import axios from "axios";
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

const classMapping = {
  7: 'Math 101',
  8: 'History 202',
  9: 'Physics 303',
  10: 'Chemistry 404',
  11: 'Biology 505',
  12: 'Computer Science 606',
  13: 'English 707',
  14: 'Psychology 808'
};


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
  const [userClasses, setUserClasses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const classes = useStyles();
  const progressValue = 40;
  const [page, setPage] = useState(0);
  const [classesPerPage, setClassesPerPage] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false); // Dynamically set this based on screen size
  const [selectedClass, setSelectedClass] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  // Function to handle window resizing
  const updateClassesPerPage = () => {
    const containerWidth = window.innerWidth - 40; // Assume 40px margin
    const cardWidth = 160; // Estimated width of each card (150px + margin)
    const cardsThatFit = Math.floor(containerWidth / cardWidth);
    setClassesPerPage(cardsThatFit);
  };

  // get classes and questions from server upon mounting
  useEffect(() => {
    const getClasses = async () => {
      try {
        const access_token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/classes/classes", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
    
        setUserClasses(response.data); // Store classes in state
      } catch (error) {
        console.error("Error fetching user classes:", error);
      }
    };

    const getQuestions = async () => {
      try {
        const access_token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/questions/user/questions", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
    
        setQuestions(response.data); // Store questions in state
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
  
    getClasses();
    getQuestions();
    // Listen for window resize to recalculate the number of classes that fit
    updateClassesPerPage(); // Initial calculation
    window.addEventListener("resize", updateClassesPerPage);

    return () => {
      window.removeEventListener("resize", updateClassesPerPage);
    };
  }, []);

  const filteredQuestions = selectedClass
  ? questions.filter((q) => q.class_id === selectedClass)
  : questions;

  const handleClassSelect = (classId) => {
    setSelectedClass(classId === selectedClass ? null : classId); // Toggle selection
  };  

  // Calculate start and end index for pagination
  const startIndex = page * classesPerPage;
  const endIndex = startIndex + classesPerPage;
  const classNames = userClasses.map((classObj) => classObj.name); // make array of class names from class objs
  const pagedClasses = classNames.slice(startIndex, endIndex);

  // Handle page navigation
  const handleNextPage = () => {
    if (endIndex < userClasses.length) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const refreshQuestions = async () => {
    try {
      const access_token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/questions/user/questions", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      setQuestions(response.data); // Update the state with new questions
    } catch (error) {
      console.error("Error refreshing questions:", error);
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
          {pagedClasses.map((className, index) => {
            const classObj = userClasses.find((c) => c.name === className); // Find the full class object
            return (
              <Card
                key={classObj.id}  // Use the ID as the key for better identification
                className={`${classes.classCard} ${
                  selectedClass === classObj.id
                    ? classes.selectedClassCard
                    : classes.unselectedClassCard
                }`}
                onClick={() => handleClassSelect(classObj.id)}  // Set the ID as the selected class
              >
                <Typography>{className}</Typography>
              </Card>
            );
          })}
        </div>

        {/* Right Arrow for Next */}
        {endIndex < userClasses.length && (
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
        Questions for {classMapping[selectedClass]}
      </Typography>
      )}

      <div className="flex justify-center p-4 px-[100px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-center">
          {filteredQuestions.length > 0 ? (
            [...filteredQuestions].reverse().map((question) => {
              const className = classMapping[question.class_id]; // Get the class name based on class_id
              return (
                <QuestionCard
                  key={question.id}
                  id={question.id}
                  text={question.text}
                  className={className}  // Now passing the class name
                />
              );
            })
          ) : (
            <Typography>No questions available for this class.</Typography>
          )}
        </div>
      </div>
      <AddQuestionModal open={isModalOpen} onClose={handleCloseModal} onQuestionSubmitted={refreshQuestions}/>
    </div>
  );
};

export default Mainscreen;
