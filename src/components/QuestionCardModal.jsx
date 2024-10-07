// import React, { useState } from 'react';
// import { Card, Typography, IconButton, Avatar, Box } from '@mui/material';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import { makeStyles } from '@mui/styles';
// import QuestionCardModal from './QuestionCardModal';  // Import the modal component

// // Custom styles using makeStyles for hover effect
// const useStyles = makeStyles({
//   questionTitle: {
//     fontWeight: 'bold',
//     fontSize: '1.1rem',
//     cursor: 'pointer',
//     '&:hover': {
//       color: '#1e90ff',  // Change color to blue on hover
//       textDecoration: 'underline',  // Underline on hover
//     },
//   },
// });

// const QuestionCard = ({ text, className, answers, profilePic, onUpvote, onDownvote }) => {
//   const [openModal, setOpenModal] = useState(false);  // State to control the modal
//   const classes = useStyles();  // Use the custom styles

//   const handleOpenModal = () => {
//     setOpenModal(true);  // Open modal
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);  // Close modal
//   };

//   return (
//     <>
//       {/* Question Card */}
//       <Card className="p-4 mb-4 bg-white text-black" sx={{ display: 'flex', alignItems: 'center' }}>
//         {/* Avatar for Profile Picture */}
//         <Avatar src={profilePic} alt="Profile Picture" sx={{ mr: 2 }} />

//         {/* Box to wrap the text content */}
//         <Box sx={{ flexGrow: 1 }}>
//           {/* Clickable Question Text with hover effect */}
//           <Typography onClick={handleOpenModal} className={classes.questionTitle}>
//             {text}
//           </Typography>
//           <Typography variant="subtitle2" sx={{ mt: 1, color: 'gray' }}>
//             Class: {className} | Answers: {answers}
//           </Typography>
//         </Box>

//         {/* Upvote/Downvote Buttons */}
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <IconButton onClick={onUpvote} sx={{ color: '#4caf50' }}> {/* Upvote Button */}
//             <ThumbUpIcon />
//           </IconButton>

//           <IconButton onClick={onDownvote} sx={{ color: '#f44336' }}> {/* Downvote Button */}
//             <ThumbDownIcon />
//           </IconButton>
//         </Box>
//       </Card>

//       {/* Use the modal component */}
//       <QuestionCardModal
//         open={openModal}
//         onClose={handleCloseModal}
//         text={text}
//         className={className}
//         answers={answers}
//       />
//     </>
//   );
// };

// export default QuestionCard;
