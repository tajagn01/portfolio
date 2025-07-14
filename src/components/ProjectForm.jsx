import React, { useState } from 'react';
import { FiX, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import.meta.env.VITE_EMAILJS_SERVICE_ID;
import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
import.meta.env.VITE_EMAILJS_TEMPLATE_ID;


function ProjectForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // EmailJS configuration
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    const templateParams = {
      to_email: 'tgarala74@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Tajagn Garala'
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        setNotification({ message: "Thank you for your message! We'll get back to you soon.", type: 'success' });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setNotification({ message: '', type: '' });
          onClose();
        }, 2500);
      })
      .catch((error) => {
        setNotification({ message: 'Sorry, there was an error sending your message. Please try again or contact us directly.', type: 'error' });
        setTimeout(() => {
          setNotification({ message: '', type: '' });
        }, 3000);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#232428] rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-[#3a3d45]">
        {/* Notification */}
        {notification.message && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 top-2 w-[90%] px-4 py-3 rounded-lg shadow-lg text-center z-50 transition-all duration-300
              ${notification.type === 'success' ? 'bg-green-600/90 text-white border border-green-400' : 'bg-red-600/90 text-white border border-red-400'}`}
          >
            {notification.message}
          </div>
        )}
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FiX size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Start Your Project</h2>
          <p className="text-blue-200 text-sm">Tell us about your project and we'll get back to you within 24 hours.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
              <FiUser size={18} />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full pl-10 pr-4 py-3 bg-[#1a1b1f] border border-[#3a3d45] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
              <FiMail size={18} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full pl-10 pr-4 py-3 bg-[#1a1b1f] border border-[#3a3d45] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Message Field */}
          <div className="relative">
            <div className="absolute left-3 top-3 text-blue-400">
              <FiMessageSquare size={18} />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              required
              rows={4}
              className="w-full pl-10 pr-4 py-3 bg-[#1a1b1f] border border-[#3a3d45] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
          >
            Send Message
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs">
            We respect your privacy. Your information is secure.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm; 