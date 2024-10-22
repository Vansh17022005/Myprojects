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

const Root = styled(Box)( {
  backgroundColor: '#121212',
  color: '#E0E0E0',
  padding: '40px 20px',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const StyledCard = styled(Card)( {
  backgroundColor: '#1E1E1E',
  color: '#fff',
  borderRadius: '12px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  opacity: 0.85,
  '&:hover': {
    transform: 'scale(1.03)',
    opacity: 1,
  },
});

const StyledCardMedia = styled(CardMedia)( {
  height: 250,
  width: '100%',
  objectFit: 'cover',
  borderBottom: '1px solid #444',
});

const StyledButton = styled(Button)( {
  backgroundColor: '#6200EA',
  color: '#fff',
  marginTop: '16px',
  '&:hover': {
    backgroundColor: '#3700B3',
  },
  padding: '10px 20px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
});

const StyledTextField = styled(TextField)( {
  marginBottom: '30px',
  backgroundColor: '#1E1E1E',
  color: '#E0E0E0',
  borderRadius: '8px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6200EA',
    },
    '&:hover fieldset': {
      borderColor: '#3700B3',
    },
  },
  input: {
    color: '#E0E0E0',
  },
});

const Footer = styled(Box)( {
  backgroundColor: '#1E1E1E',
  color: '#B0BEC5',
  padding: '20px',
  textAlign: 'center',
  marginTop: 'auto',
});

function Home() {
  const [carModels, setCarModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        const response = await axiosInstance.get('/car-models/top-reviewed/');
        setCarModels(response.data);
      } catch (error) {
        console.error('Error fetching car models:', error);
      }
    };
    fetchCarModels();
  }, []);

  const filteredCars = carModels.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Root>
      <Typography variant="h4" gutterBottom style={{ color: '#fff', fontWeight: 'bold' }}>
        Top Reviewed Cars
      </Typography>

      <StyledTextField
        variant="outlined"
        fullWidth
        placeholder="Search by car name or brand..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Grid container spacing={4}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
              <StyledCard>
                <StyledCardMedia
                  image={car.image}
                  title={`${car.brand} ${car.name}`}
                />
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: '600', marginBottom: '8px' }}>
                    {car.brand} {car.name}
                  </Typography>
                  <Typography variant="body1" style={{ color: '#B0BEC5' }}>
                    Price: ${car.price}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#B0BEC5' }}>
                    Year: {car.year}
                  </Typography>
                  <StyledButton
                    component={Link}
                    to={`/car-models/${car.id}`}
                    fullWidth
                  >
                    Preview
                  </StyledButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" style={{ color: '#B0BEC5' }}>
            No cars found.
          </Typography>
        )}
      </Grid>

      <Footer>
        <Typography variant="body1">© 2024 Your Company Name. All rights reserved.</Typography>
        <Typography variant="body2">Contact us: info@yourcompany.com | (123) 456-7890</Typography>
        <Typography variant="body2" style={{ pointerEvents: 'none' }}>
          Terms of Service | Privacy Policy
        </Typography>
      </Footer>
    </Root>
  );
}

export default Home;
