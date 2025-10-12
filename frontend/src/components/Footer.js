import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">E</span>
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
                <span>info@elitesglobal.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <span>+91 9604127449</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🏢</span>
                <span>Plot No 28, Arun Sarnaik Nagar, Nana Patil Chawk,Behind Shahu Highschool, Kolhapur, 416011</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; 2025 Elites Global. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-300 text-sm">Privacy Policy</span>
            <span className="text-gray-300 text-sm">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; // ⬅️ MAKE SURE THIS EXISTS





















// import React from 'react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="col-span-1 md:col-span-2">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold">P</span>
//               </div>
//               <h3 className="text-xl font-bold">ProAuthenticate</h3>
//             </div>
//             <p className="text-gray-300 mb-4 max-w-md">
//               Bringing trust and transparency to agricultural supply chains through blockchain technology. 
//               We ensure every product is authentically verified from farm to table.
//             </p>
//             <div className="flex space-x-4">
//               <div className="bg-primary px-3 py-1 rounded-full text-sm">
//                 🌱 Sustainable
//               </div>
//               <div className="bg-green-600 px-3 py-1 rounded-full text-sm">
//                 🔒 Verified
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
//               <li><Link to="/products" className="text-gray-300 hover:text-white transition">Products</Link></li>
//               <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
//               <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
//             <ul className="space-y-2 text-gray-300">
//               <li className="flex items-center space-x-2">
//                 <span>📧</span>
//                 <span>info@proauthenticate.com</span>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <span>📞</span>
//                 <span>+91 98765 43210</span>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <span>🏢</span>
//                 <span>Agricultural Tech Park, Mumbai, India</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-300 text-sm">
//             &copy; 2024 ProAuthenticate. All rights reserved.
//           </p>
//           <div className="flex space-x-6 mt-4 md:mt-0">
//             <span className="text-gray-300 text-sm">Privacy Policy</span>
//             <span className="text-gray-300 text-sm">Terms of Service</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;