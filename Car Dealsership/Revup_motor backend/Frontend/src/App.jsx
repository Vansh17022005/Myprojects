// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import CarModels from './components/CarModels';
import Dealers from './components/Dealers';
import Appointments from './components/Appointments';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar'; // Import Navbar
import Home from './components/Home';
import CarDetails from './components/CarDetails';
import DealerDetail from './components/DealerDetail';
import BookAppointment from './components/BookAppointment';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar /> {/* Add Navbar here */}
        <div className='container mt-4'>
          <Routes>
           
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/car-models" element={<CarModels />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/car-models/:id" element={<CarDetails />} />
            <Route path="/dealers" element={<Dealers/>} />
            <Route path="/dealers/:id" element={<DealerDetail/>} />
            <Route path="/book-appointment/:id" element={<BookAppointment />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
