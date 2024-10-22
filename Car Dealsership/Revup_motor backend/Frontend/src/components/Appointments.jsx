import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled(Container)({
  backgroundColor: '#f0f0f0', // Light gray background for the page
  color: '#333', // Dark gray text
  minHeight: '100vh',
  paddingTop: '40px',
});

const StyledCard = styled(Card)({
  backgroundColor: '#fff', // White card background
  color: '#000', // Black text inside card
  marginBottom: '20px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  opacity: 0.9, 
  '&:hover': {
    opacity: 1, 
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#333', // Dark gray button
  color: '#fff',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#555', // Slightly lighter on hover
  },
});

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get('/showappointments/');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axiosInstance.delete(`/appointments/${id}/`);
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
        alert('Appointment deleted successfully!');
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Failed to delete appointment');
      }
    }
  };

  return (
    <Root>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      {appointments.length === 0 ? (
        <Typography variant="body1">You haven't taken any appointments.</Typography>
      ) : (
        <Grid container spacing={3}>
          {appointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6">
                    Customer: {appointment.user.username}
                  </Typography>
                  <Typography>
                    <strong>Selected Car:</strong> {appointment.car_model.name} {appointment.car_model.brand} {appointment.car_model.year}
                  </Typography>
                  <Typography>
                    <strong>Dealer name:</strong> {appointment.dealer.name}
                  </Typography>
                  <Typography>
                    <strong>Appointment Date:</strong> {new Date(appointment.appointment_date).toLocaleString()}
                  </Typography>
                  <StyledButton
                    fullWidth
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Delete Appointment
                  </StyledButton>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Root>
  );
};

export default Appointments;
