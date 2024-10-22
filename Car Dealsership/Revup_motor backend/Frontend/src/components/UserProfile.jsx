import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import AuthContext from '../context/AuthContext';

// Styled components
const StyledContainer = styled(Container)({
  backgroundColor: '#121212', // Dark background
  color: '#E0E0E0', // Light text for contrast
  minHeight: '100vh', // Full viewport height
  paddingTop: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledCard = styled(Card)({
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.7)',
  backgroundColor: '#1E1E1E', // Dark card background
  borderRadius: '12px',
  height: '100%', // Ensures uniform height
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.02)', // Slight scale on hover
  },
});

const StyledCardTitle = styled(Typography)({
  color: '#BB86FC', // Lavender color for the title
  fontWeight: 'bold',
  textAlign: 'center',
  fontFamily: '"Garamond", serif', // Elegant font for a gothic feel
});

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#BB86FC' }}>
        User Details
      </Typography>
      <StyledCard>
        <CardContent>
          <StyledCardTitle variant="h6">User Information</StyledCardTitle>
          <Typography variant="body1" style={{ marginBottom: '8px', color: '#E0E0E0' }}>
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography variant="body1" style={{ color: '#E0E0E0' }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default UserProfile;