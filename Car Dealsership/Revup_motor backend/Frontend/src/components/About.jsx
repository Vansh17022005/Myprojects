import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for the light-themed design
const Root = styled(Box)({
  backgroundColor: '#f0f4f8', // Light background for the page
  color: '#333', // Dark text
  minHeight: '100vh',
  paddingTop: '40px',
  paddingBottom: '40px',
});

const StyledCard = styled(Card)({
  backgroundColor: '#ffffff', // White card background
  color: '#333', // Dark text
  height: '100%',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
  borderRadius: '8px', // Rounded corners
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)', // Slight zoom on hover
  },
});

const About = () => {
  return (
    <Root>
      <Container>
        {/* Welcoming Message */}
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Our Automotive Family!
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          At CAR DEALERS COMPANY, we strive to connect you with the best vehicles to fit your lifestyle. Our extensive inventory and knowledgeable team make car shopping enjoyable and hassle-free.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Our mission is to provide a seamless car-buying experience while ensuring the highest standards of service and integrity. We believe that every customer deserves personalized attention and expert guidance.
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          Our Core Values
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" align="center">
                  Integrity
                </Typography>
                <Typography variant="body2" align="center">
                  We believe in honesty and transparency in every transaction. Our team is committed to providing you with clear information and honest recommendations.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" align="center">
                  Customer Focus
                </Typography>
                <Typography variant="body2" align="center">
                  Your satisfaction is our top priority. We go the extra mile to meet your needs, ensuring a friendly and supportive environment for every customer.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" align="center">
                  Quality Assurance
                </Typography>
                <Typography variant="body2" align="center">
                  We ensure that every vehicle meets our stringent quality standards. Our dedicated team conducts thorough inspections to guarantee the reliability and performance of every car we sell.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        <Typography variant="h5" align="center" gutterBottom mt={5}>
          Join Us in Your Car-Buying Journey!
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Whether you're searching for your first car or upgrading to your dream vehicle, we are here to assist you every step of the way. Our experienced staff is ready to provide expert advice and support tailored to your unique needs.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Visit us today to experience the difference and find the perfect vehicle that matches your lifestyle!
        </Typography>
      </Container>
    </Root>
  );
};

export default About;
