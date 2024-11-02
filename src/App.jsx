import React, { useContext } from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import { AuthProvider, AuthContext } from './api/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import Register from './pages/auth/Register.jsx';
import NotFound from './pages/NotFound.jsx'
import Login from './pages/auth/Login.jsx';
const App = () => {
  return (
    <AuthProvider>
      <Router basename="/">
        <div className="overflow-x-hidden bg-lightCyan">
        <MainRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};
const MainRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
