import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, Typography, Box, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled container for gray theme
const StyledContainer = styled(Box)({
  backgroundColor: '#f5f5f5', // Light gray background
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledCard = styled(Card)({
  backgroundColor: '#e0e0e0', // Light gray card background
  color: '#333',
  padding: '40px',
  maxWidth: '400px',
  width: '100%',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
});

const StyledButton = styled(Button)({
  backgroundColor: '#757575', // Medium gray button
  color: '#fff',
  '&:hover': {
    backgroundColor: '#616161', // Darker gray on hover
  },
});

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      await axiosInstance.post('/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMsg = error.response.data;
        if (errorMsg.username) {
          setErrorMessage('Username already exists. Please try another.');
        } else {
          setErrorMessage('Registration failed. Please try again.');
        }
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        {errorMessage && (
          <Typography color="error" align="center">
            {errorMessage}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
              InputLabelProps={{ style: { color: '#333' } }}
              InputProps={{
                style: { color: '#333' },
              }}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              InputLabelProps={{ style: { color: '#333' } }}
              InputProps={{
                style: { color: '#333' },
              }}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              InputLabelProps={{ style: { color: '#333' } }}
              InputProps={{
                style: { color: '#333' },
              }}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              InputLabelProps={{ style: { color: '#333' } }}
              InputProps={{
                style: { color: '#333' },
              }}
            />
          </Box>
          <StyledButton fullWidth type="submit" variant="contained">
            Register
          </StyledButton>
        </form>
        <Typography align="center" mt={3}>
          Already have an account?{' '}
          <Link href="/login" color="primary" underline="hover">
            Sign In
          </Link>
        </Typography>
      </StyledCard>
    </StyledContainer>
  );
};

export default Register;
