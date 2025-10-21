import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary';
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Elitess Global</h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`${isActiveLink('/')} transition duration-300`}>Home</Link>
            <Link to="/products" className={`${isActiveLink('/products')} transition duration-300`}>Products</Link>
            <Link to="/about" className={`${isActiveLink('/about')} transition duration-300`}>About Us</Link>
            <Link to="/contact" className={`${isActiveLink('/contact')} transition duration-300`}>Contact</Link>
            
            {/* Login Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary transition duration-300 flex items-center">
                Login 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <Link to="/farmer-login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition">
                    👨‍🌾 Farmer Login
                  </Link>
                  <Link to="/customer-login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition">
                    🛒 Customer Login
                  </Link>
                  <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition">
                    ⚙️ Admin Login
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Get Started Dropdown */}
            <div className="relative group">
              <button className="btn-primary text-sm px-4 py-2 flex items-center">
                Get Started
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-2">
                  <p className="text-xs text-gray-500 px-2 py-1">Join as:</p>
                  <Link to="/farmer-login" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition rounded">
                    <span className="mr-2">👨‍🌾</span>
                    <div>
                      <div className="font-medium">Farmer</div>
                      <div className="text-xs text-gray-500">Sell your products</div>
                    </div>
                  </Link>
                  <Link to="/customer-login" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition rounded">
                    <span className="mr-2">🛒</span>
                    <div>
                      <div className="font-medium">Customer</div>
                      <div className="text-xs text-gray-500">Buy verified products</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-4 slide-in">
            <div className="flex flex-col space-y-4 px-4">
              <Link to="/" className={`${isActiveLink('/')} py-2`} onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products" className={`${isActiveLink('/products')} py-2`} onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link to="/about" className={`${isActiveLink('/about')} py-2`} onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/contact" className={`${isActiveLink('/contact')} py-2`} onClick={() => setIsMenuOpen(false)}>Contact</Link>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-gray-500 mb-2">Login As:</p>
                <Link to="/farmer-login" className="block py-2 text-gray-700 hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>
                  👨‍🌾 Farmer
                </Link>
                <Link to="/customer-login" className="block py-2 text-gray-700 hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>
                  🛒 Customer
                </Link>
                <Link to="/admin" className="block py-2 text-gray-700 hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>
                  ⚙️ Admin
                </Link>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-gray-500 mb-2">Get Started As:</p>
                <Link to="/farmer-login" className="block w-full bg-green-600 text-white text-center py-2 rounded mb-2" onClick={() => setIsMenuOpen(false)}>
                  👨‍🌾 Farmer Sign Up
                </Link>
                <Link to="/customer-login" className="block w-full btn-primary text-center py-2" onClick={() => setIsMenuOpen(false)}>
                  🛒 Customer Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// ⬇️⬇️⬇️ MAKE SURE THIS EXPORT STATEMENT IS AT THE END ⬇️⬇️⬇️
export default Navbar;

// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   const isActiveLink = (path) => {
//     return location.pathname === path ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary';
//   };

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center space-x-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center shadow-md">
//                 <span className="text-white font-bold text-xl">P</span>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">ProAuthenticate</h1>
//                 <p className="text-xs text-gray-500 -mt-1">Blockchain Verified</p>
//               </div>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link to="/" className={`${isActiveLink('/')} transition duration-300`}>Home</Link>
//             <Link to="/products" className={`${isActiveLink('/products')} transition duration-300`}>Products</Link>
//             <Link to="/about" className={`${isActiveLink('/about')} transition duration-300`}>About Us</Link>
//             <Link to="/contact" className={`${isActiveLink('/contact')} transition duration-300`}>Contact</Link>
//             <Link to="/farmer-login" className="btn-primary text-sm px-4 py-2">
//               Farmer Login
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-700 hover:text-primary focus:outline-none"
//             >
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 {isMenuOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white border-t py-4 slide-in">
//             <div className="flex flex-col space-y-4 px-4">
//               <Link to="/" className={`${isActiveLink('/')} py-2`} onClick={() => setIsMenuOpen(false)}>Home</Link>
//               <Link to="/products" className={`${isActiveLink('/products')} py-2`} onClick={() => setIsMenuOpen(false)}>Products</Link>
//               <Link to="/about" className={`${isActiveLink('/about')} py-2`} onClick={() => setIsMenuOpen(false)}>About Us</Link>
//               <Link to="/contact" className={`${isActiveLink('/contact')} py-2`} onClick={() => setIsMenuOpen(false)}>Contact</Link>
//               <Link to="/farmer-login" className="btn-primary text-center py-2" onClick={() => setIsMenuOpen(false)}>
//                 Farmer Login
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;