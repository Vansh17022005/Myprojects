import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Container,
  
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for dark theme
const StyledContainer = styled(Container)({
  backgroundColor: '#fff', // White background
  color: '#000', // Dark text
  padding: '40px',
  borderRadius: '8px',
  border: '2px solid #000', // Black border with 2px thickness
  marginTop: '40px',
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
  backgroundColor: '#fff', // White input field for better contrast
  borderRadius: '4px',
});

const StyledSelect = styled(Select)({
  backgroundColor: '#fff', // White background for select input
  borderRadius: '4px',
});

const BookAppointment = () => {
  const { id } = useParams(); // Get car ID from the route
  const [appointmentDate, setAppointmentDate] = useState(''); // Appointment date state
  const [dealerId, setDealerId] = useState(''); // Dealer ID state
  const [dealers, setDealers] = useState([]); // State to hold dealers
  const navigate = useNavigate();

  // Fetch dealers associated with the specific car model when the component mounts
  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await axiosInstance.get(`/dealers/?car=${id}`);
        setDealers(response.data); // Set the dealers state
      } catch (error) {
        console.error('Error fetching dealers:', error);
      }
    };

    fetchDealers();
  }, [id]);

  // Get today's date in the required format
  const today = new Date().toISOString().slice(0, 16);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new appointment with car_model, appointment_date, and selected dealer
      const response = await axiosInstance.post('/appointments/', {
        car_model: id,
        dealer: dealerId,
        appointment_date: appointmentDate,
      });
      alert('Appointment booked successfully!');
      navigate(`/car-models/${id}`); // Redirect back to car details page
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert("You already have an appointment for this car with this dealer.");
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        Book Appointment
      </Typography>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          type="datetime-local"
          label="Select Appointment Date"
          variant="outlined"
          fullWidth
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          inputProps={{ min: today }} // Set minimum date to today
          required
        />
        <FormControl fullWidth variant="outlined" margin="normal" required>
          <InputLabel>Select Dealer</InputLabel>
          <StyledSelect
            value={dealerId}
            onChange={(e) => setDealerId(e.target.value)}
            label="Select Dealer"
          >
            <MenuItem value="">
              <em>Select a dealer</em>
            </MenuItem>
            {dealers.map((dealer) => (
              <MenuItem key={dealer.id} value={dealer.id}>
                {dealer.name} - {dealer.location}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <StyledButton type="submit" variant="contained" fullWidth>
          Book Appointment
        </StyledButton>
      </form>
    </StyledContainer>
  );
};

export default BookAppointment;
