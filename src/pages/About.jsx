import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/Maersk-Logo.png'; // Path to your logo
import mapVideo from '../assets/morccoMapMp4.mp4'; // Path to Morocco map video
import truckIcon from '../assets/Van1.png'; // Path to truck icon
import packaging from '../assets/packaging.webm'; // Path to packaging video

const Delivery = () => {
    return (
        <div className="min-h-screen bg-[#4DACB5] text-gray-800 font-roboto">
            {/* Hero Section */}
            <header className="relative h-screen flex flex-col items-center justify-center text-center text-white">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <img src={logo} alt="Logo de l'entreprise" className="w-32 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold mb-2">Livraison Rapide et Fiable</h1>
                    <p className="text-lg">Nous livrons partout au Maroc en 24h-48h.</p>
                    <video src={packaging} className="w-32 h-24 rounded-lg mt-4" autoPlay loop muted playsInline>
                        Votre navigateur ne supporte pas la balise vidéo.
                    </video>
                </motion.div>
            </header>

            {/* Delivery Info Section */}
            <section className="flex flex-col md:flex-row items-center justify-around py-12 px-8">
                <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="w-full md:w-1/2"
                >
                    <video src={mapVideo} className="w-full h-auto rounded-lg" autoPlay loop muted playsInline>
                        Votre navigateur ne supporte pas la balise vidéo.
                    </video>
                </motion.div>

                <motion.div 
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="w-full md:w-1/2 text-center md:text-left ml-3"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Nous couvrons tout le Maroc</h2>
                    <p className="text-lg mb-6 text-white">
                        Grâce à notre réseau fiable, nous assurons la livraison de votre commande partout au Maroc en 24h-48h. Profitez du paiement à la livraison pour une expérience d'achat sans tracas.
                    </p>
                    <motion.img 
                        src={truckIcon} 
                        alt="Camion de livraison" 
                        className="w-64 h-auto mx-auto md:mx-0"
                        animate={{ x: [0, 250, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    />
                </motion.div>
            </section>

            {/* Why Choose Us Section at the Bottom */}
            <section className="bg-lightColor py-12 px-8 mt-8 shadow-md ">
                <h3 className="text-3xl font-semibold text-center text-darkCyan mb-8">Pourquoi Nous Choisir ?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Livraison en 24h-48h', desc: 'Service de livraison rapide et fiable à travers le Maroc.', icon: '🚚' },
                        { title: 'Paiement à la livraison', desc: 'Payez uniquement lorsque votre commande arrive.', icon: '💵' },
                        { title: 'Couverture Nationale', desc: 'Nous livrons dans chaque coin du Maroc.', icon: '🇲🇦' },
                    ].map((card, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="bg-lightGray p-6 rounded-lg shadow-md flex flex-col items-center"
                        >
                            <div className="text-6xl mb-4">{card.icon}</div>
                            <h4 className="text-2xl font-bold mb-2">{card.title}</h4>
                            <p className="text-center">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-12 px-8 text-center bg-gray-100">
                <h3 className="text-3xl font-semibold text-darkCyan mb-4">Nous Contacter</h3>
                <p className="text-lg mb-6">
                    Vous avez des questions ? Contactez-nous et notre équipe se fera un plaisir de vous aider !
                </p>
                <div>
                    <p>Email: contact@deliverymaroc.com</p>
                    <p>Téléphone: +212 6 12 34 56 78</p>
                    <p>Adresse: 123 Rue de Casablanca, Maroc</p>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 px-8 bg-[#4DACB5] text-white">
                <h3 className="text-3xl font-semibold text-center mb-8">Témoignages de nos clients</h3>
                <div className="flex flex-col md:flex-row gap-8">
                    {[
                        { name: 'Ahmed B.', rating: 5, feedback: 'Service excellent ! Livraison rapide et personnel très professionnel.' },
                        { name: 'Sara M.', rating: 4, feedback: 'Très bon service, j’ai reçu ma commande à temps.' },
                        { name: 'Rachid E.', rating: 5, feedback: 'Je recommande ! Les délais sont respectés et le suivi est super.' },
                    ].map((testimonial, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-6 rounded-lg shadow-md text-darkCyan"
                        >
                            <h4 className="text-xl font-bold">{testimonial.name}</h4>
                            <p className="mb-2">{"⭐".repeat(testimonial.rating)}</p>
                            <p className="text-center">{testimonial.feedback}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Delivery;
