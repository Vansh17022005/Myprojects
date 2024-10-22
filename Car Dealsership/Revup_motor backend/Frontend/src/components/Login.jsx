import React, { useState, useContext } from 'react';
import { TextField, Button, Card, Typography, Box, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import AuthContext from '../context/AuthContext';

// Styled container for gray theme
const StyledContainer = styled(Box)({
  backgroundColor: '#f5f5f5', // Light gray background
  minHeight: '100vh', // Full viewport height
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledCard = styled(Card)({
  backgroundColor: '#808080', // Gray card background
  color: '#fff',
  padding: '40px',
  maxWidth: '400px',
  width: '100%',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
});

const StyledButton = styled(Button)({
  backgroundColor: '#696969', // Dark gray button
  color: '#fff',
  '&:hover': {
    backgroundColor: '#a9a9a9', // Lighter gray on hover
  },
});

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const { login } = useContext(AuthContext); // Login from context

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleError = () => {
    setErrorMessage(''); // Clear error on input focus
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData); // Call login function from context
    } catch (error) {
      // Handle login error, typically a 400 or 401 from the backend
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid credentials. Please check your username and password.');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <Typography variant="h4" gutterBottom align="center">
          Login
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
              onFocus={handleError}
              InputLabelProps={{ style: { color: '#fff' } }} // White text for label
              InputProps={{
                style: { color: '#fff', borderColor: '#fff' }, // White text for input
              }}
              required
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
              onFocus={handleError}
              InputLabelProps={{ style: { color: '#fff' } }} // White text for label
              InputProps={{
                style: { color: '#fff', borderColor: '#fff' }, // White text for input
              }}
              required
            />
          </Box>
          <StyledButton fullWidth type="submit" variant="contained">
            Login
          </StyledButton>
        </form>

        {/* Sign-up link */}
        <Typography align="center" mt={3}>
          Don't have an account?{' '}
          <Link href="/register" color="secondary" underline="hover">
            Sign up
          </Link>
        </Typography>
      </StyledCard>
    </StyledContainer>
  );
};

export default Login;
