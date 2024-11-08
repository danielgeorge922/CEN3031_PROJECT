import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const ReplyCard = ({ reply }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, ml: 4, p: 1, borderRadius: 2, backgroundColor: '#f0f0f0' }}>
    <Avatar src={reply.userProfile.picture} sx={{ width: 24, height: 24, mr: 1 }} />
    <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 1 }}>{reply.userProfile.name}</Typography>
    <Typography variant="body2">{reply.text}</Typography>
  </Box>
);

export default ReplyCard;
