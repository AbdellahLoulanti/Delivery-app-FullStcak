import React, { useContext } from 'react';


import Navbar from './components/navbar/Navbar.jsx';
import { AuthProvider, AuthContext } from './api/AuthContext';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import Home from './pages/home.jsx';
import Register from './pages/auth/Register.jsx';
import NotFound from './pages/NotFound.jsx'
import Login from './pages/auth/Login.jsx';
import DeliveryForm from './pages/client/DeliveryForm.jsx';
import HistoriqueCommandes from './pages/client/HistoriqueCommandes.jsx';
import ProfilePage from './pages/client/ProfilePage.jsx';
import AccountSettings from './pages/client/AccountSettings.jsx';
import EspaceGestionnaire from './pages/gestionnaire/EspaceGestionnaire.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import About from './pages/About.jsx';

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
          {(!user || user.role !== 'GESTIONNAIRE') && <Navbar />}
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/mon-profile" element={<ProfilePage />} />
              <Route path="/livraison-colis" element={<DeliveryForm />} />
              <Route path="/historique-commandes" element={<HistoriqueCommandes />} />
              <Route path="/account-settings" element={<AccountSettings />} />
              
              
              {/* Define role-specific routes */}
              {/* {user && user.role === 'GESTIONNAIRE' && ( */}
                  <Route path="/espace-gestionnaire" element={<PrivateRoute> <EspaceGestionnaire /> </PrivateRoute> } />
              {/* )} */}
              {user && user.role === 'ADMIN' && (
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
              )}
              {user && user.role === 'LIVREUR' && (
                  <Route path="/espace-livreur" element={<EspaceLivreur />} />
              )}

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </>
  );
};


export default App;
