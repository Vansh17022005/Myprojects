import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { AppBar, Toolbar, Button, Typography, Grid, Box, Avatar, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for a soft light theme navbar
const StyledAppBar = styled(AppBar)(({
  backgroundColor: '#f5f5f5', // Soft light gray background
  padding: '10px 20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
}));

const StyledButton = styled(Button)(({
  color: '#333', // Dark text for buttons
  fontFamily: 'Times New Roman', // Font family
  '&:hover': {
    backgroundColor: '#e0e0e0', // Slightly darker gray on hover
  },
}));

const Title = styled(Typography)(({
  color: '#333', // Dark color for title
  fontFamily: 'Times New Roman', // Font family
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center', // Center vertically
}));

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUpcoming, setAnchorElUpcoming] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuClickUpcoming = (event) => {
    setAnchorElUpcoming(event.currentTarget);
  };

  const handleCloseMenuUpcoming = () => {
    setAnchorElUpcoming(null);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {/* Left-aligned title with logo */}
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Title variant="h6" component={Link} to="/" style={{ textDecoration: 'none' }}>
              <Avatar
                alt="Logo"
                src="D:\Car Dealsership\Revup_motor backend\Frontend\src\components\carl.avif" // Replace with your logo path
                sx={{ width: 60, height: 60 , marginRight: 1 }} // Adjust size and spacing
              />
              Car Dekho
            </Title>
          </Grid>

          {/* Right-aligned content with buttons */}
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StyledButton component={Link} to="/" disableRipple>
                Home
              </StyledButton>
              

             

              {user ? (
                <>
                  <StyledButton component={Link} to="/dealers" disableRipple>
                    Dealers
                  </StyledButton>
                  <StyledButton component={Link} to="/appointments" disableRipple>
                    Appointments
                  </StyledButton>
                  <StyledButton component={Link} to="/profile" disableRipple>
                    Profile
                  </StyledButton>
                  <StyledButton component={Link} to="/about" disableRipple>
                    About Us
                  </StyledButton>
                  <StyledButton onClick={logout} disableRipple variant="contained" color="error">
                    Logout
                  </StyledButton>
                </>
              ) : (
                <>
                  <StyledButton component={Link} to="/about" disableRipple>
                    About Us
                  </StyledButton>
                  <StyledButton component={Link} to="/login" disableRipple>
                    Login
                  </StyledButton>
                  <StyledButton component={Link} to="/register" disableRipple>
                    Register
                  </StyledButton>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;