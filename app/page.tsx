"use client"

import { ParticlesWrapper } from "@/components/lazy-wrapper";
import Introduction from "@/components/introduction";
import TransitionPage from "@/components/transition-page";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { usePerformanceMonitoring } from "@/hooks/usePerformance";
import { businessStats, serviceData } from "@/data";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "@/utils/motion-transitions";

export default function Home() {
  usePerformanceMonitoring();

  return (
    <main className="min-h-screen">
      <TransitionPage />
      
      {/* Hero Section */}
      <div className="flex min-h-[100vh] h-full bg-no-repeat bg-gradient-cover relative">
        <ParticlesWrapper />
        <Introduction />
        
        {/* Demo Features Button */}
        <div className="absolute bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 z-30">
          <Link
            href="/demo-features"
            className="flex items-center gap-2 px-6 py-3 bg-primary/20 backdrop-blur-lg text-primary border border-primary/30 rounded-full hover:bg-primary/30 transition-all duration-300 animate-pulse shadow-lg"
            prefetch={true}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Explore Interactive Features</span>
          </Link>
        </div>
      </div>

      {/* Business Stats Section */}
      <motion.section 
        className="py-20 px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={slideIn('down', 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Proven Track Record</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Delivering exceptional results with cutting-edge technology and creative solutions
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {businessStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={slideIn('up', index * 0.1)}
                className="text-center p-6 glass-morphism rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-primary mb-3 flex justify-center">
                  <div className="text-3xl">{stat.icon}</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-white font-semibold mb-1 text-sm md:text-base">{stat.label}</div>
                <div className="text-gray-400 text-xs md:text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Preview Section */}
      <motion.section 
        className="py-20 px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={slideIn('down', 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What I <span className="gradient-text">Offer</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Full-stack development services using cutting-edge technologies to create 
              scalable, efficient, and user-centric digital solutions
            </p>
          </motion.div>

          {/* Services Preview Grid - Show only first 3 services */}
          <motion.div
            variants={staggerContainer(0.1, 0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {serviceData.slice(0, 3).map((service, index) => (
              <motion.div
                key={index}
                variants={slideIn('up', index * 0.1)}
                className="p-6 glass-morphism rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Services CTA */}
          <motion.div
            variants={slideIn('up', 0.6)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              View All Services & Pricing
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact CTA Section */}
      <motion.section 
        className="py-20 px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={slideIn('up', 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center p-12 glass-morphism rounded-2xl border border-primary/30 bg-primary/5"
          >
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
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
