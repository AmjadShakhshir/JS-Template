"use client"

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  package: {
    id: number;
    name: string;
    price: string;
    duration: string;
    description: string;
    features: string[];
    popular: boolean;
    ctaText: string;
  };
  index: number;
}

const PricingCard = ({ package: pkg, index }: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-8 rounded-2xl glass-morphism border-2 transition-all duration-300 hover:scale-105 flex flex-col h-full ${
        pkg.popular 
          ? 'border-primary shadow-2xl shadow-primary/20 bg-primary/5' 
          : 'border-gray-700 hover:border-primary/50'
      }`}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-1 px-4 py-2 bg-primary rounded-full text-black text-sm font-semibold">
            <Star className="w-4 h-4 fill-current" />
            Most Popular
          </div>
        </div>
      )}

      {/* Package Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-3">{pkg.name}</h3>
        <div className="mb-3">
          <span className="text-4xl font-bold gradient-text">{pkg.price}</span>
          <span className="text-gray-400 ml-2">/ project</span>
        </div>
        <div className="text-sm text-primary mb-3 font-medium">{pkg.duration}</div>
        <p className="text-gray-300 text-sm leading-relaxed">{pkg.description}</p>
      </div>

      {/* Features List - This will grow to fill available space */}
      <div className="flex-grow mb-6">
        <ul className="space-y-3">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Call to Action - Always at bottom */}
      <div className="mt-auto">
        <Link
          href="/contact"
          className={`block w-full py-4 px-6 rounded-lg text-center font-semibold transition-all duration-300 ${
            pkg.popular
              ? 'bg-primary text-black hover:bg-primary/90 hover:scale-105'
              : 'bg-gray-700 text-white hover:bg-primary hover:text-black'
          }`}
        >
          {pkg.ctaText}
        </Link>
      </div>
    </motion.div>
  );
};

export default PricingCard;
