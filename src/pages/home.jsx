import {React , useEffect} from 'react'
import Hero from '../components/Hero/Hero';
import NavigationSection from '../components/NavigationSection/NavigationSection';
import Register from './auth/Register';

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
    <div id="register">
        <Register />
      </div>
    </>
  )
}

export default home