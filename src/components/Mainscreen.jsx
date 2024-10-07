import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, LinearProgress, Box, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QuestionCard from './QuestionCard';  // Import the reusable component

// Example data for questions and classes
const exampleClasses = [
  'Math 101', 'History 202', 'Physics 303', 'Chemistry 404',
  'Biology 505', 'Computer Science 606', 'English 707', 'Psychology 808',
  'Math 101', 'History 202', 'Physics 303', 'Chemistry 404',
  'Biology 505', 'Computer Science 606', 'English 707', 'Psychology 808',
];

// Example questions data
const exampleQuestions = [
  { id: 1, text: 'How do you solve this equation in Math 101?', class: 'Math 101', answers: 3 },
  { id: 2, text: 'Can someone explain the history timeline from 1800 to 1900?', class: 'History 202', answers: 2 },
  { id: 3, text: 'What are the laws of thermodynamics?', class: 'Physics 303', answers: 5 },
];

// Custom makeStyles for styling
const useStyles = makeStyles({
  root: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  bar: ({ value }) => ({
    borderRadius: 5,
    background: `linear-gradient(90deg, #2b6dd6 0%, #9c64f4 ${value}%, #ff0000 100%)`,
    backgroundSize: `${value}% 100%`,
    transition: 'all 0.5s ease-in-out',
  }),
  titleCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '2rem',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '600px',
    borderWidth: '3px',
    borderColor: 'black',
    margin: '0 auto',
    marginBottom: '2rem',
  },
  titleText: {
    background: 'linear-gradient(to right, #2b6dd6, #9c64f4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '2rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  classContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    position: 'relative',
  },
  classCard: {
    padding: '10px',
    marginRight: '10px',
    minWidth: '150px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#1364e8',
    '&:hover': {
      backgroundColor: '#6ea4fa',
      textDecoration: 'underline',
    },
    color: '#e1eafa',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: '50%',
    border: '2px solid black',
    padding: '0.5rem',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  leftArrow: {
    left: '-20px',
  },
  rightArrow: {
    right: '-20px',
  },
  hrLine: {
    borderTop: '2px solid black',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
});

// Gradient Progress Bar Component
const GradientProgressBar = ({ value }) => {
  const classes = useStyles({ value });

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
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
  const [classesPerPage, setClassesPerPage] = useState(4); // Dynamically set this based on screen size

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
    window.addEventListener('resize', updateClassesPerPage);

    return () => {
      window.removeEventListener('resize', updateClassesPerPage);
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
    <div className="p-6" style={{ background: 'linear-gradient(to bottom right, #f3e5f5, #e1bee7)', minHeight: '100vh' }}>
      {/* Title Card */}
      <Card className={classes.titleCard}>
        <Typography className={classes.titleText}>
          BrainBoosters
        </Typography>
      </Card>

      {/* Black Line Above */}
      <hr className={classes.hrLine} />

      {/* Horizontal Class Selector with Pagination */}
      <div className={classes.classContainer}>
        {/* Left Arrow for Previous */}
        {page > 0 && (
          <IconButton className={`${classes.arrowButton} ${classes.leftArrow}`} onClick={handlePrevPage}>
            <ArrowBackIosIcon sx={{ color: 'black' }} />
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
          <IconButton className={`${classes.arrowButton} ${classes.rightArrow}`} onClick={handleNextPage}>
            <ArrowForwardIosIcon sx={{ color: 'black' }} />
          </IconButton>
        )}
      </div>

      {/* Black Line Below */}
      <hr className={classes.hrLine} />

      {/* Add a Question Button */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: '#06c975', '&:hover': { backgroundColor: '#89b5fa' } }}
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

      {/* Use the reusable QuestionCard component */}
      {exampleQuestions.map((question) => (
        <QuestionCard
          key={question.id}
          text={question.text}
          className={question.class}
          answers={question.answers}
        />
      ))}
    </div>
  );
};

export default Mainscreen;
