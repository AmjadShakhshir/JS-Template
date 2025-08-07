"use client"

import { serviceData, pricingPackages } from "@/data";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "@/utils/motion-transitions";
import TransitionPage from "@/components/transition-page";
import PricingCard from "@/components/pricing-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ServicesPage = () => {
  return (
    <>
      <TransitionPage />
      <div className="min-h-screen py-20">
        {/* Services Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-4 my-20"
        >
          <div className="text-center mb-16">
            <motion.h1 
              variants={slideIn('down', 0.2)}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              My <span className="gradient-text">Services</span>
            </motion.h1>
            <motion.p 
              variants={slideIn('up', 0.4)}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto"
            >
              I offer specialized full-stack development services, creating modern web applications 
              and mobile solutions. Using cutting-edge technologies like React, Node.js, and cloud platforms, 
              I design intuitive user interfaces and robust backend systems that reflect your brand identity 
              and enhance your digital presence.
            </motion.p>
          </div>

          {/* Services Grid */}
          <motion.div
            variants={staggerContainer(0.1, 0.6)}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {serviceData.map((item, index) => (
              <motion.div
                key={index}
                variants={slideIn('up', index * 0.1)}
                className="flex flex-col p-6 h-auto rounded-xl cursor-pointer glass-morphism group hover:bg-primary/10 transition-all duration-300 hover:border-primary border-2 border-gray-700 hover:scale-105"
              >
                <div className="mb-4 text-4xl text-primary group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section 
          className="max-w-7xl mx-auto px-4 mb-20"
        >
          <motion.div
            variants={slideIn('down', 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Pricing Packages</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Choose the perfect package for your project needs. All packages include modern design, 
              responsive development, and ongoing support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-stretch">
            {pricingPackages.map((pkg, index) => (
              <PricingCard key={pkg.id} package={pkg} index={index} />
            ))}
          </div>

          {/* Custom Projects CTA */}
          <motion.div
            variants={slideIn('up', 0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center p-8 glass-morphism rounded-2xl border border-gray-700"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Need Something Custom?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Every project is unique. Let&apos;s discuss your specific requirements and create a tailored solution 
              that perfectly fits your business needs and budget.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Get Custom Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section 
          variants={slideIn('up', 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <div className="p-12 glass-morphism rounded-2xl border border-primary/30 bg-primary/5">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s bring your ideas to life. Contact me today for a free consultation 
              and let&apos;s discuss how we can create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                Start Project
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-black transition-all duration-300"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default ServicesPage;
