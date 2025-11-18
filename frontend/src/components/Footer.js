import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white"> {/* Changed from bg-gray-900 to bg-black */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {/* Custom Logo Image - Circular */}
<div className="w-16 h-16 flex items-center justify-center">
  <img 
    src="/images/logo/elitess-logo.png" 
    alt="Elitess Global" 
    className="w-full h-full object-contain rounded-full"
    onError={(e) => {
      // Fallback if image doesn't exist
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'flex';
    }}
  />
  {/* Fallback logo if image doesn't load - also circular */}
  <div className="w-16 h-16 bg-primary rounded-full hidden items-center justify-center">
    <span className="text-white font-bold text-2xl">E</span>
  </div>
</div>
<h3 className="text-xl font-bold">Elites Global</h3>
</div>
<p className="text-gray-300 mb-4 max-w-md">
  Bringing trust and transparency to agricultural supply chains through blockchain technology. 
  We ensure every product is authentically verified from farm to table.
</p>
            <div className="flex space-x-4">
              <div className="bg-primary px-3 py-1 rounded-full text-sm">
                🌱 Sustainable
              </div>
              <div className="bg-green-600 px-3 py-1 rounded-full text-sm">
                🔒 Verified
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition">Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <span>📧</span>
                <span>eliteglobal22498@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418"/>
                  </svg>
                </span>
                <span>+91 9922569800</span>
              </li>       
              <li className="flex items-center space-x-2">
                <span>🏢</span>
                <span>Plot No 28, Arun Sarnaik Nagar, Nana Patil Chawk, Behind Shahu Highschool, Kolhapur, 416011</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"> {/* Changed border-gray-700 to border-gray-800 */}
          <p className="text-gray-300 text-sm">
            &copy; 2025 Elites Global. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-300 text-sm hover:text-white transition cursor-pointer">Privacy Policy</span>
            <span className="text-gray-300 text-sm hover:text-white transition cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;