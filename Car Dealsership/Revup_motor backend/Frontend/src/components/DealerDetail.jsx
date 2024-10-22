import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../axios';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for new theme
const StyledContainer = styled(Box)( {
  backgroundColor: '#f0f4f8', // Light gray background
  color: '#333', // Dark gray text
  padding: '40px',
  minHeight: '100vh', // Full viewport height
});

const StyledCard = styled(Card)( {
  backgroundColor: '#fff', // White background for dealer details
  color: '#000', // Dark text inside card
  borderRadius: '8px',
  height: '100%', // Ensures uniform height
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  opacity: 0.9,
  '&:hover': {
    opacity: 1, 
  },
});

const StyledCardMedia = styled(CardMedia)( {
  height: 220, // Uniform card media size
  width: '100%',
  objectFit: 'cover', // Keep image proportions and cover the area
});

const StyledButton = styled(Button)( {
  backgroundColor: '#007bff', // Blue button
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0056b3', // Darker blue on hover
  },
  marginTop: '16px', // Add space above the button
});

const DealerDetail = () => {
  const { id } = useParams(); // Extract dealer ID from the route
  const [dealer, setDealer] = useState(null); // Dealer data state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchDealerDetails = async () => {
      try {
        const response = await axiosInstance.get(`/dealers/${id}/`); // Fetch dealer details
        setDealer(response.data);
      } catch (error) {
        console.error('Error fetching dealer details:', error);
        setError('Failed to load dealer details.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchDealerDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress color="secondary" />; // Loading spinner
  }

  if (error) {
    return <Typography color="error">{error}</Typography>; // Error message
  }

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Dealer: {dealer.name}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <StyledCard>
            <StyledCardMedia
              image={dealer.image}
              title={dealer.name}
            />
            <CardContent>
              <Typography variant="h5">
                {dealer.name}
              </Typography>
              <Typography variant="body1">
                Location: {dealer.location}
              </Typography>
              <Typography variant="body1">
                Phone: {dealer.phone}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Display related car models */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '40px' }}>
        Available Cars
      </Typography>
      <Grid container spacing={4}>
        {dealer.car.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <StyledCard>
              <StyledCardMedia
                image={car.image}
                title={`${car.brand} ${car.name}`}
              />
              <CardContent>
                <Typography variant="h6">
                  {car.brand} {car.name}
                </Typography>
                <Typography variant="body2">
                  Price: ${car.price}
                </Typography>
                <Typography variant="body2">
                  Year: {car.year}
                </Typography>
                <StyledButton
                  component={Link}
                  to={`/car-models/${car.id}`}
                  variant="contained"
                  fullWidth
                >
                  Show More
                </StyledButton>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default DealerDetail;
