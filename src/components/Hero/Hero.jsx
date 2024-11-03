import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import mapPattern from '../../assets/map.png';

const Hero = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.prod.website-files.com/623dca811bf2511d7a1053b4/js/tawssil-preview.0017f03b6.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <header className="relative overflow-hidden font-sans">
            {/* Gradient Background with Map Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-tealDark to-lightCyan">
                <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${mapPattern})` }}></div>
            </div>

         
            {/* Content */}
            <div className="relative px-6 py-20 md:px-10 lg:px-16 z-10">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        {/* Text Section with Framer Motion Animation */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                                À la recherche d’une solution pour l’envoi de vos colis ?
                            </h1>
                            <p className="text-lg md:text-xl text-white opacity-90">
                                Optez dès maintenant pour notre service de livraison pour une expérience sans égale !
                            </p>
                            <div className="mt-4">
                                <motion.a 
                                    href="/livraison-colis" 
                                    className="inline-block border-2 border-white text-white font-semibold py-2 px-4 rounded-full hover:bg-white hover:text-teal-500 transition"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Livré mon colis
                                </motion.a>
                            </div>
                        </motion.div>

                        {/* Image Section with Framer Motion Animation */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full flex justify-center"
                        >
                            <img 
                                src="https://cdn.prod.website-files.com/623dca811bf2511d7a1053b4/653a8e877f4d157ace746094_AGENCE%20TAWSSIL.webp" 
                                loading="lazy" 
                                alt="Image représentant une agence Tawssil" 
                                className="rounded-lg  w-full max-w-xs h-auto"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
