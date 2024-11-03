import React from 'react';
import { motion } from 'framer-motion';

const ServicesSection = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="services" className="section-services bg-[#4DACB5] py-16">
            <div className="page-padding">
                <div className="container-large">
                    <div className="py-16 px-8">
                        <div className="layout_component">
                            <div className="mb-16 text-center">
                                <h2 className="text-white text-3xl font-bold">La livraison simplifiée<br /></h2>
                                <p className="text-lg text-white">Tawssil est une marque du groupe Cash Plus pensée pour booster la chaine de valeur de nos clients</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                {[
                                    {
                                        img: "https://cdn.prod.website-files.com/623dca811bf2511d7a1053b4/62448637667c5821af63f243_60508b7e10436da4bd4fa161_traceability%20icon.svg",
                                        title: "Fiabilité",
                                        description: "Nous nous engageons à garantir à vos clients la réception de leurs colis en parfait état."
                                    },
                                    {
                                        img: "https://cdn.prod.website-files.com/623dca811bf2511d7a1053b4/62448637d19325043fd5ea29_60508b7e10436d84314fa17c_icon.svg",
                                        title: "Traçabilité",
                                        description: "Suivez vos colis en temps réel sur notre plateforme."
                                    },
                                    {
                                        img: "https://cdn.prod.website-files.com/623dca811bf2511d7a1053b4/6244863717b2a485ceb34b69_60508b7e10436d41ca4fa162_speed%20icon.svg",
                                        title: "Rapidité",
                                        description: "Nous assurons les meilleurs délais de livraison et de contre-remboursement."
                                    },
                                    {
                                        img: "https://cdn.prod.website-files.com/623dca811bf2511d7a1053b4/62448636e7ec30769109b4a5_60508b7e10436d9d554fa157_easiness%20icon.svg",
                                        title: "Practicité",
                                        description: "Nous récupérons vos colis directement chez vous."
                                    }
                                ].map((service, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex flex-col items-center justify-center w-60 h-60 text-center"
                                        initial="hidden"
                                        whileInView="visible"
                                        variants={fadeInUp}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                    >
                                        <div className="mb-4">
                                            <img src={service.img} loading="lazy" alt={`Icône représentant ${service.title.toLowerCase()} de Tawssil`} className="w-16 h-16" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">{service.title}<br /></h3>
                                        <p className="text-white">{service.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="partenaires-logo" className="header-bottom w-full"></div>
            </div>
        </section>
    );
};

export default ServicesSection;
