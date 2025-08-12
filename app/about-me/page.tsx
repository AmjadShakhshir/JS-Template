"use client"

import { dataAboutPage, dataCounter, personalInfo } from "@/data";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "@/utils/motion-transitions";
import CountUp from "react-countup";
import TransitionPage from "@/components/transition-page";
import Image from "next/image";
import { useState } from "react";

const AboutMePage = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <TransitionPage />
      <div className="w-full max-w-6xl px-4 pb-32 mx-auto mt-40 md:pb-24 md:px-6">
        <motion.div 
          variants={staggerContainer()}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Avatar Section */}
          <motion.div 
            variants={slideIn('left', 0.2)}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {imageError ? (
                <Image
                  src="/fallback/avatar-placeholder.svg"
                  alt="About Avatar placeholder"
                  width={400}
                  height={400}
                  className="rounded-full border-4 border-primary/30 shadow-2xl opacity-70"
                />
              ) : (
                <Image
                  src="/avatar/amjad.jpg"
                  alt="About Amjad"
                  width={400}
                  height={400}
                  className="rounded-full border-4 border-primary/30 shadow-2xl"
                  onError={() => setImageError(true)}
                />
              )}
              <div className="absolute -bottom-4 -right-4 bg-primary text-white px-4 py-2 rounded-full font-bold">
                3+ Years Experience
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div variants={slideIn('right', 0.4)}>
            <h1 className="text-2xl leading-tight text-center lg:text-left md:text-5xl md:mt-10">
              About{' '}
              <span className="font-bold gradient-text">
                {personalInfo.name}
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              I&apos;m an outcome‑focused full‑stack developer with {new Date().getFullYear() - 2022}+ years building modern web applications using React, Node.js, and cloud technologies.  I embed AI‑powered features—like recommendation engines, workflow automation, and chat assistants—directly into applications to boost business value and enhance user experiences. I write clean, maintainable code and collaborate seamlessly with cross‑functional teams.
            </p>

            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              My goal is to create digital solutions that not only meet business requirements but also 
              provide exceptional user experiences. I believe in writing clean, maintainable code and 
              collaborating effectively with cross-functional teams.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Counter */}
        <motion.div 
          variants={slideIn('up', 0.6)}
          initial="hidden"
          animate="visible"
          className="grid justify-between max-w-4xl grid-cols-2 gap-6 mx-auto my-16 md:flex md:grid-cols-4"
        >
          {dataCounter.map(({ id, endCounter, text, lineRight, lineRightMobile }) => (
            <div key={id} className={`${lineRight && 'ltr'}`}>
              <div className={`${lineRight && 'px-4 border-2 border-transparent md:border-e-gray-100'} ${lineRightMobile && 'border-e-gray-100'} text-center`}>
                <p className="flex mb-2 text-3xl font-extrabold md:text-5xl text-primary justify-center">
                  <CountUp end={endCounter} start={0} duration={3} />
                  <span>+</span>
                </p>
                <p className="text-sm uppercase text-gray-300">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div 
          variants={slideIn('up', 0.8)}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            My Journey
          </h2>
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative">
              {dataAboutPage.map((data, index) => (
                <motion.div 
                  key={data.id} 
                  variants={slideIn('left', 0.2 * index)}
                  className="relative py-8 pl-8 sm:pl-36 group"
                >
                  <div className="flex flex-col sm:flex-row items-start mb-1 
                              group-last:before:hidden before:absolute 
                              before:left-2 sm:before:left-0 before:h-full
                              before:px-px before:bg-gradient-to-b before:from-primary before:to-accent sm:before:ml-[8rem] 
                              before:self-start before:-translate-x-1/2 
                              before:translate-y-3 after:absolute after:left-2 
                              sm:after:left-0 after:w-3 after:h-3 after:bg-primary 
                              after:border-4 after:box-content after:border-darkBg 
                              after:rounded-full sm:after:ml-[8rem] after:-translate-x-1/2 
                              after:translate-y-1.5">
                    <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-28 sm:w-32 h-6 mb-3 sm:mb-0 text-white bg-primary rounded-full px-3">
                      {data.date}
                    </time>
                    <div className="text-xl font-bold text-white">{data.subtitle}</div>
                  </div>
                  <h3 className="mb-1 text-2xl font-bold sm:mb-0 text-primary">{data.title}</h3>
                  <div className="text-gray-300 leading-relaxed">{data.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutMePage;
