"use client"

import { contactInfo, socialNetworks } from "@/data";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "@/utils/motion-transitions";
import TransitionPage from "@/components/transition-page";
import { useToast } from "@/components/toast-provider";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { submitContactForm, type ContactFormData } from "@/lib/services/contact";

const ContactPage = () => {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        showSuccess('Message sent successfully!', result.message || 'Thank you for your message!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        showError('Failed to send message', result.error || 'Please try again later.');
      }
    } catch (error) {
      showError('Network error', 'Please check your connection and try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <TransitionPage />
      <div className="w-full max-w-6xl px-4 pb-32 mx-auto mt-40 md:pb-24 md:px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Contact Information */}
          <motion.div variants={slideIn('left', 0.2)}>
            <h1 className="text-2xl leading-tight md:text-4xl md:mb-8">
              Let&apos;s Work <span className="font-bold gradient-text">Together</span>
            </h1>
            
            <p className="mb-8 text-lg text-gray-300">
              Ready to bring your ideas to life? I&apos;m always excited to work on new projects 
              and help businesses achieve their digital goals. Let&apos;s discuss how we can create 
              something amazing together.
            </p>

            <div className="space-y-6">
              <motion.div 
                variants={slideIn('left', 0.4)}
                className="flex items-center gap-4"
              >
                <div className="p-3 rounded-full bg-primary/20 text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-gray-300">{contactInfo.email}</p>
                </div>
              </motion.div>

              <motion.div 
                variants={slideIn('left', 0.5)}
                className="flex items-center gap-4"
              >
                <div className="p-3 rounded-full bg-primary/20 text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Phone</h3>
                  <p className="text-gray-300">{contactInfo.phone}</p>
                </div>
              </motion.div>

              <motion.div 
                variants={slideIn('left', 0.6)}
                className="flex items-center gap-4"
              >
                <div className="p-3 rounded-full bg-primary/20 text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Location</h3>
                  <p className="text-gray-300">{contactInfo.address}</p>
                </div>
              </motion.div>
            </div>

            <motion.div 
              variants={slideIn('left', 0.7)}
              className="mt-8"
            >
              <h3 className="mb-4 text-lg font-semibold text-white">Connect with me</h3>
              <div className="flex gap-4">
                {socialNetworks.map(({ id, logo, src, name }) => (
                  <a
                    key={id}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-700 hover:bg-primary transition-colors duration-200 text-gray-300 hover:text-white"
                    title={name}
                  >
                    {logo}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={slideIn('right', 0.3)}>
            <div className="p-8 rounded-xl glass-morphism">
              <h2 className="mb-6 text-2xl font-bold gradient-text">Send Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;
