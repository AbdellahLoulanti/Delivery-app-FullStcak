import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import arrowLeft from '../../assets/arrow_left.png';
import ecommerce from '../../assets/ecommerce.jpeg';
import entreprise from '../../assets/entreprise.jpg';
const tabContent = [
  {
    title: "Particuliers",
    image: "https://cdn.prod.website-files.com/623dca811bf2511d7a1053b4/6246b14c006a49d5f5754bf4_Livraison%20de%20colis%20Tawssil.webp",
    text: "Dites adieu aux délais d'attente interminables ! Chez Tawssil, nous sommes pleinement conscients de la valeur que vous accordez à votre temps.",
    buttonLink: "/particuliers",
    buttonText: "Découvrir le service Particuliers"
  },
  {
    title: "E-commerçants",
    image: ecommerce,
    text: "Optimisez vos livraisons avec nos services dédiés aux e-commerçants.",
    buttonLink: "/e-commercants",
    buttonText: "Découvrir le service E-commerçants"
  },
  {
    title: "Entreprises",
    image: entreprise,
    text: "Des solutions de livraison sur mesure pour les entreprises.",
    buttonLink: "/entreprises",
    buttonText: "Découvrir le service Entreprises"
  }
];
const SlideDown = (delay = 0) => ({
  hidden: { opacity: 0, y: -50 }, // part du haut
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const NavigationSection = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <section className="bg-lightColor py-10 relative">
      {/* Arrow Transition */}
      <motion.img
  src={arrowLeft}
  alt="Arrow"
  variants={SlideDown(0.8)}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="absolute right-10 transform -translate-y-1/2 w-36"
/>



      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-roboto font-extrabold text-textBleu mb-4">Simplifiez votre navigation</h2>
          <p className="text-lg text-gray-700">Choisissez directement le service qui vous intéresse</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex space-x-2 justify-center mb-8">
          {tabContent.map((tab, index) => (
            <button
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`py-4 px-6 rounded-full transition-transform duration-300 text-lg ${
                selectedTab === index ? "bg-darkCyan text-white" : "bg-lightCyan text-darkCyan hover:bg-lightYellow"
              }`}
              style={{ minWidth: '150px', maxWidth: '200px' }}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content with Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="tab-content bg-lightColor p-6 rounded-lg "
          >
            <div className="flex flex-col md:flex-row items-center justify-start space-y-6 md:space-y-0 md:space-x-8 py-6">
              <div className="w-full md:w-1/2">
                <img
                  src={tabContent[selectedTab].image}
                  alt={tabContent[selectedTab].title}
                  className="rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="w-full md:w-1/2 text-left">
                <p className="text-lg text-gray-800 mb-4 font-semibold">{tabContent[selectedTab].text}</p>
                <a
                  href={tabContent[selectedTab].buttonLink}
                  className="inline-block bg-transparent border-2 border-darkCyan text-darkCyan py-3 px-6 rounded-full transition duration-300 hover:bg-deepCyan hover:text-white"
                >
                  {tabContent[selectedTab].buttonText}
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NavigationSection;
