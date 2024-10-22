// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axiosInstance from '../axios';
// import { Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
// import { styled } from '@mui/material/styles';

// // Styled components for a vibrant theme
// const StyledContainer = styled(Box)({
//   backgroundColor: '#f0f0f0', // Light background
//   color: '#333', // Dark text
//   padding: '40px 20px',
//   minHeight: '100vh', // Full viewport height
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
// });

// const StyledCard = styled(Card)({
//   backgroundColor: '#fff', // White card background
//   color: '#000', // Dark text inside card
//   borderRadius: '12px',
//   height: '100%', // Uniform height for cards
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
//   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Light shadow effect
//   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//   '&:hover': {
//     transform: 'scale(1.02)', // Slight zoom on hover
//     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Darker shadow on hover
//   },
// });

// const StyledCardMedia = styled(CardMedia)({
//   height: 220, // Image height
//   width: '100%',
//   objectFit: 'cover', // Ensure image covers the card
//   borderBottom: '1px solid #ddd', // Subtle border for image separation
// });

// const StyledButton = styled(Button)({
//   backgroundColor: '#007BFF', // Bright blue button
//   color: '#fff',
//   marginTop: '16px',
//   '&:hover': {
//     backgroundColor: '#0056b3', // Darker blue on hover
//   },
// });

// const Dealers = () => {
//   const [dealers, setDealers] = useState([]);

//   useEffect(() => {
//     const fetchDealers = async () => {
//       const response = await axiosInstance.get('/dealers/');
//       setDealers(response.data);
//     };
//     fetchDealers();
//   }, []);

//   return (
//     <StyledContainer>
//       <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
//         Dealers
//       </Typography>
//       <Grid container spacing={4}>
//         {dealers.map((dealer) => (
//           <Grid item xs={12} sm={6} md={4} key={dealer.id}>
//             <StyledCard>
//               {dealer.image && (
//                 <StyledCardMedia
//                   image={dealer.image}
//                   title={dealer.name}
//                 />
//               )}
//               <CardContent>
//                 <Typography variant="h6">{dealer.name}</Typography>
//                 <Typography variant="body2" style={{ color: '#555' }}>
//                   Location: {dealer.location}
//                 </Typography>
//                 <Typography variant="body2" style={{ color: '#555' }}>
//                   Phone: {dealer.phone}
//                 </Typography>
//                 <StyledButton
//                   component={Link}
//                   to={`/dealers/${dealer.id}`}
//                   variant="contained"
//                   fullWidth
//                 >
//                   More Details
//                 </StyledButton>
//               </CardContent>
//             </StyledCard>
//           </Grid>
//         ))}
//       </Grid>
//     </StyledContainer>
//   );
// };

// export default Dealers;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledContainer = styled(Box)({
  backgroundColor: '#F5F5F5', // Light gray background
  color: '#333',
  padding: '40px 20px',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const StyledCard = styled(Card)({
  backgroundColor: '#FFFFFF', // White card background
  borderRadius: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
});

const StyledCardMedia = styled(CardMedia)({
  height: 200, // Adjusted height for image
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  objectFit: 'cover',
});

const StyledButton = styled(Button)({
  backgroundColor: '#6200EA', // Vibrant purple button
  color: '#FFFFFF',
  marginTop: '16px',
  borderRadius: '8px',
  padding: '12px 20px',
  '&:hover': {
    backgroundColor: '#3700B3', // Darker purple on hover
  },
});

const Dealers = () => {
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    const fetchDealers = async () => {
      const response = await axiosInstance.get('/dealers/');
      setDealers(response.data);
    };
    fetchDealers();
  }, []);

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Car Dealers
      </Typography>
      <Grid container spacing={4}>
        {dealers.map((dealer) => (
          <Grid item xs={12} sm={6} md={4} key={dealer.id}>
            <StyledCard>
              {dealer.image && (
                <StyledCardMedia
                  image={dealer.image}
                  title={dealer.name}
                />
              )}
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: '600', marginBottom: '8px' }}>
                  {dealer.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Location: {dealer.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Phone: {dealer.phone}
                </Typography>
                <StyledButton
                  component={Link}
                  to={`/dealers/${dealer.id}`}
                  variant="contained"
                  fullWidth
                >
                 Show Full Details
                </StyledButton>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default Dealers;
