import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for dark theme
const Root = styled(Box)({
  backgroundColor: '#000', // Black background
  color: '#fff', // White text
  padding: '20px',
});

const StyledCard = styled(Card)({
  backgroundColor: '#fff', // White card background
  color: '#000', // Black text inside card
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

const StyledCardMedia = styled(CardMedia)({
  height: 250, // Card media size
  width: '100%',
  objectFit: 'cover', // Keep image proportions
});

const StyledButton = styled(Button)({
  backgroundColor: '#000', // Black button
  color: '#fff',
  '&:hover': {
    backgroundColor: '#444', // Slightly lighter on hover
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  backgroundColor: '#fff', // White background for search input
  borderRadius: '4px',
});

const CarModels = () => {
  const [carModels, setCarModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCarModels = async () => {
      const response = await axiosInstance.get('/car-models/');
      setCarModels(response.data);
    };
    fetchCarModels();
  }, []);

  const filteredCars = carModels.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Root>
      <Typography variant="h4" gutterBottom>
        Car Models
      </Typography>

      {/* Search bar */}
      <StyledTextField
        variant="outlined"
        fullWidth
        placeholder="Search by car name or brand..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Grid container spacing={3}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <StyledCard>
                <StyledCardMedia
                  image={car.image}
                  title={`${car.brand} ${car.name}`}
                />
                <CardContent>
                  <Typography variant="h5">
                    {car.brand} {car.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${car.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Year: {car.year}
                  </Typography>
                  <StyledButton
                    component={Link}
                    to={`/car-models/${car.id}`}
                    fullWidth
                  >
                    Show More
                  </StyledButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Typography>No cars found matching your search criteria.</Typography>
        )}
      </Grid>
    </Root>
  );
};

export default CarModels;
