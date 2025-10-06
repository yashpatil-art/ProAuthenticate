import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log(isLogin ? 'Customer Login:' : 'Customer Register:', formData);
    alert(isLogin ? 'Login successful!' : 'Registration successful!');
  };

  const benefits = [
    {
      icon: '🔒',
      title: 'Verified Products',
      description: 'Access to blockchain-verified authentic products'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick shipping from verified farmers to your doorstep'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive prices by buying directly from farmers'
    },
    {
      icon: '📱',
      title: 'Easy Tracking',
      description: 'Track your orders and product authenticity'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isLogin ? 'Welcome Back!' : 'Join ProAuthenticate'}
          </h1>
          <p className="text-xl">
            {isLogin 
              ? 'Access verified agricultural products and track your orders' 
              : 'Create your account and start buying authentic products directly from farmers'
            }
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Benefits Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Shop With Us?</h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-primary">10,000+</div>
                <div className="text-gray-600 text-sm">Happy Customers</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-gray-600 text-sm">Verified Farmers</div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 font-semibold text-center ${
                  isLogin 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 font-semibold text-center ${
                  !isLogin 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full btn-primary py-4 text-lg"
              >
                {isLogin ? 'Login to Account' : 'Create Account'}
              </button>

              {isLogin && (
                <div className="text-center">
                  <Link to="/contact" className="text-primary hover:underline text-sm">
                    Forgot your password?
                  </Link>
                </div>
              )}
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600 text-sm text-center">
                {isLogin 
                  ? "Don't have an account? " 
                  : "Already have an account? "
                }
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-semibold hover:underline"
                >
                  {isLogin ? 'Register here' : 'Login here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const CustomerLogin = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     fullName: '',
//     phone: '',
//     location: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!isLogin && formData.password !== formData.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }
//     console.log(isLogin ? 'Customer Login:' : 'Customer Register:', formData);
//     alert(isLogin ? 'Login successful!' : 'Registration successful!');
//   };

//   const benefits = [
//     {
//       icon: '🔒',
//       title: 'Verified Products',
//       description: 'Access to blockchain-verified authentic products'
//     },
//     {
//       icon: '🚚',
//       title: 'Fast Delivery',
//       description: 'Quick shipping from verified farmers to your doorstep'
//     },
//     {
//       icon: '💰',
//       title: 'Best Prices',
//       description: 'Competitive prices by buying directly from farmers'
//     },
//     {
//       icon: '📱',
//       title: 'Easy Tracking',
//       description: 'Track your orders and product authenticity'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 fade-in">
      
//       {/* Header */}
//       <section className="bg-gradient-to-r from-primary to-green-700 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             {isLogin ? 'Welcome Back!' : 'Join ProAuthenticate'}
//           </h1>
//           <p className="text-xl">
//             {isLogin 
//               ? 'Access verified agricultural products and track your orders' 
//               : 'Create your account and start buying authentic products directly from farmers'
//             }
//           </p>
//         </div>
//       </section>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid lg:grid-cols-2 gap-12">
          
//           {/* Benefits Section */}
//           <div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Shop With Us?</h2>
//             <div className="space-y-6">
//               {benefits.map((benefit, index) => (
//                 <div key={index} className="flex items-start space-x-4">
//                   <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
//                     {benefit.icon}
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
//                     <p className="text-gray-600">{benefit.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Stats */}
//             <div className="mt-8 grid grid-cols-2 gap-4">
//               <div className="bg-white rounded-lg p-4 text-center shadow-sm">
//                 <div className="text-2xl font-bold text-primary">10,000+</div>
//                 <div className="text-gray-600 text-sm">Happy Customers</div>
//               </div>
//               <div className="bg-white rounded-lg p-4 text-center shadow-sm">
//                 <div className="text-2xl font-bold text-primary">500+</div>
//                 <div className="text-gray-600 text-sm">Verified Farmers</div>
//               </div>
//             </div>
//           </div>

//           {/* Form Section */}
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <div className="flex border-b border-gray-200 mb-6">
//               <button
//                 onClick={() => setIsLogin(true)}
//                 className={`flex-1 py-4 font-semibold text-center ${
//                   isLogin 
//                     ? 'text-primary border-b-2 border-primary' 
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => setIsLogin(false)}
//                 className={`flex-1 py-4 font-semibold text-center ${
//                   !isLogin 
//                     ? 'text-primary border-b-2 border-primary' 
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 Register
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {!isLogin && (
//                 <>
//                   <div>
//                     <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       id="fullName"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                       placeholder="Enter your full name"
//                     />
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                         placeholder="Enter your phone number"
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
//                         Location
//                       </label>
//                       <input
//                         type="text"
//                         id="location"
//                         name="location"
//                         value={formData.location}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                         placeholder="City, State"
//                       />
//                     </div>
//                   </div>
//                 </>
//               )}

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                   placeholder="Enter your email address"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                   Password *
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                   placeholder="Enter your password"
//                 />
//               </div>

//               {!isLogin && (
//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                     Confirm Password *
//                   </label>
//                   <input
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                     placeholder="Confirm your password"
//                   />
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className="w-full btn-primary py-4 text-lg"
//               >
//                 {isLogin ? 'Login to Account' : 'Create Account'}
//               </button>

//               {isLogin && (
//                 <div className="text-center">
//                   <Link to="/contact" className="text-primary hover:underline text-sm">
//                     Forgot your password?
//                   </Link>
//                 </div>
//               )}
//             </form>

//             <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
//               <p className="text-gray-600 text-sm text-center">
//                 {isLogin 
//                   ? "Don't have an account? " 
//                   : "Already have an account? "
//                 }
//                 <button
//                   onClick={() => setIsLogin(!isLogin)}
//                   className="text-primary font-semibold hover:underline"
//                 >
//                   {isLogin ? 'Register here' : 'Login here'}
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerLogin;