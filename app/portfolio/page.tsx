"use client"

import { dataPortfolio } from "@/data";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "@/utils/motion-transitions";
import TransitionPage from "@/components/transition-page";
import PortfolioBox from "@/components/portfolio-box";

const PortfolioPage = () => {
  return (
    <>
      <TransitionPage />
      <div className="min-h-screen py-20">
        <div className="w-full max-w-6xl px-4 mx-auto">
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            <motion.div 
              variants={slideIn('down', 0.2)}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                My Latest <span className="gradient-text">Projects</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Explore my portfolio of modern web applications and digital solutions, 
                showcasing cutting-edge technologies and creative problem-solving.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer(0.05, 0.2)}
              className="relative z-10 grid gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3 items-stretch"
            >
              {dataPortfolio.map((data, index) => (
                <motion.div
                  key={data.id}
                  variants={slideIn('up', index * 0.05)}
                  className="h-full"
                >
                  <PortfolioBox data={data} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
