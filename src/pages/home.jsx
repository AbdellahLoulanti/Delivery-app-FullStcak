import {React , useEffect} from 'react'
import Hero from '../components/Hero/Hero';
import NavigationSection from '../components/NavigationSection/NavigationSection';
import Register from './auth/Register';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import Footer from '../components/Footer/Footer';

const home = () => {
    
    useEffect(() => {
        // Vérifiez si l'URL contient "#register" et défilez jusqu'à cette section
        if (window.location.hash === '#register') {
          const registerSection = document.getElementById('register');
          if (registerSection) {
            registerSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
        
      }, []);
  return (
    <>
    <Hero />
    <NavigationSection />
    <ServicesSection />

    <div id="register">
        <Register />
      </div>
      <Footer />
    </>
  )
}

export default home