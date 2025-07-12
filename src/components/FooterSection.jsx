import React from 'react';
import { FaLinkedinIn, FaTrophy } from 'react-icons/fa';
import { BsCalendar2Event } from 'react-icons/bs';

function FooterSection() {
  return (
    <footer id="contact" className="w-full bg-[#18191a] border-t border-gray-800 pt-16 pb-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Start a Project */}
        <div>
          <h3 className="text-3xl font-extrabold text-white mb-4">Start a Project</h3>
          <p className="text-gray-400 mb-6 text-lg">Let's create your next big idea.</p>
          <a href="#contact" className="inline-block px-8 py-4 bg-blue-200 hover:bg-blue-300 text-black font-semibold text-lg rounded-lg shadow transition flex items-center gap-2">
            Get in Touch <span className="ml-1">→</span>
          </a>
        </div>
        {/* Services */}
        <div>
          <h3 className="text-3xl font-extrabold text-white mb-4">Services</h3>
          <ul className="text-gray-300 text-lg space-y-2">
            <li>UI/UX Design</li>
            <li>Web Development</li>
          </ul>
        </div>
        {/* Tools */}
        <div>
          <h3 className="text-3xl font-extrabold text-white mb-4">Websites</h3>
          <ul className="text-gray-300 text-lg space-y-2">
            <li>E-commerce store</li>
            <li>restaurant website</li>
            <li>Project Timeline</li>
            <li>ROI Calculator</li>
          </ul>
        </div>
        {/* Connect */}
        <div>
          <h3 className="text-3xl font-extrabold text-white mb-4">Connect</h3>
          <ul className="text-gray-300 text-lg space-y-4">
            <li className="flex items-center gap-3"><FaLinkedinIn className="text-blue-400" /> <a href="#" className="hover:text-blue-300">LinkedIn</a></li>
            <li className="flex items-center gap-3"><BsCalendar2Event className="text-blue-400" /> <a href="#" className="hover:text-blue-300">Schedule a Call</a></li>
            <li className="flex items-center gap-3"><FaTrophy className="text-yellow-400" /> <a href="#" className="hover:text-blue-300">Awwwards</a></li>
          </ul>
        </div>
      </div>
      <hr className="my-10 border-gray-800" />
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm pt-2">
        &copy; {new Date().getFullYear()} Tajagn. All rights reserved.
      </div>
    </footer>
  );
}

export default FooterSection; 