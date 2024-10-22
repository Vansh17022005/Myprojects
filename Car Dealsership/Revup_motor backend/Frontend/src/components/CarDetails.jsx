import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../axios';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for dark theme
const StyledContainer = styled(Container)( {
  backgroundColor: '#000', // Black background
  color: '#fff', // White text
  padding: '40px', // Added more padding for spacious layout
  borderRadius: '8px',
  marginTop: '40px',
});

const StyledButton = styled(Button)( {
  backgroundColor: '#A9A9A9', // Dark gray button
  color: '#fff',
  '&:hover': {
    backgroundColor: '#444', // Slightly lighter on hover
  },
});

const StyledBox = styled(Box)( {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: '400px', // Keep image at its original size
  overflow: 'hidden',
  marginBottom: '40px', // Added more space between image and details
});

const StyledTypography = styled(Typography)( {
  marginBottom: '16px', // Add space between each text item
});

const CarDetails = () => {
  const { id } = useParams(); // Get car ID from the route
  const [carDetails, setCarDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // State to toggle details

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axiosInstance.get(`/car-models/${id}/`);
        setCarDetails(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    fetchCarDetails();
  }, [id]);

  if (!carDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <StyledContainer maxWidth="md">
      <Grid container spacing={4}> {/* Increased grid spacing */}
        <Grid item xs={12} md={6}>
          <StyledBox>
            <img
              src={carDetails.image}
              alt={`${carDetails.name}`}
              style={{ maxWidth: '100%', height: 'auto' }} // Keep original image size
            />
          </StyledBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledTypography variant="h5" gutterBottom>
            {carDetails.brand} {carDetails.name} ({carDetails.year})
          </StyledTypography>
          
          <Button onClick={() => setShowDetails(!showDetails)} style={{ marginBottom: '16px' }}>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>

          {showDetails && (
            <>
              <StyledTypography variant="body1">
                <strong>Price:</strong> ${carDetails.price}
              </StyledTypography>
              <StyledTypography variant="body1">
                <strong>Engine:</strong> {carDetails.engine}
              </StyledTypography>
              <StyledTypography variant="body1">
                <strong>Power:</strong> {carDetails.power}
              </StyledTypography>
              <StyledTypography variant="body1">
                <strong>Seating Capacity:</strong> {carDetails.seating_capacity}
              </StyledTypography>
              <StyledTypography variant="body1">
                <strong>Drive Type:</strong> {carDetails.drive_type}
              </StyledTypography>
              <StyledTypography variant="body1">
                <strong>Ground Clearance:</strong> {carDetails.ground_clearance}
              </StyledTypography>
              <StyledTypography variant="body1">
                <strong>Torque:</strong> {carDetails.torque}
              </StyledTypography>
              <StyledTypography variant="body1">
                <strong>Review:</strong> {carDetails.review}/5
              </StyledTypography>
              <StyledTypography variant="body1" gutterBottom>
                <strong>Description:</strong> {carDetails.description}
              </StyledTypography>
            </>
          )}

          {/* Book Appointment Button */}
          <StyledButton
            component={Link}
            to={`/book-appointment/${id}`}
            variant="contained"
            fullWidth
          >
            Book Appointment
          </StyledButton>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default CarDetails;
