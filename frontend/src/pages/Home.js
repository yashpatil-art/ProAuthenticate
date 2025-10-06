import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const products = [
    {
      name: 'Premium Sugar',
      type: 'sugar',
      icon: '🍚',
      description: 'Pure organic sugarcane with blockchain verification',
      features: ['99.8% Purity', 'Organic Certified', 'Direct from Farms']
    },
    {
      name: 'Quality Cashew',
      type: 'cashew', 
      icon: '🥜',
      description: 'Grade W240 raw cashews, direct from farms',
      features: ['W240 Grade', 'Raw & Natural', 'Quality Tested']
    },
    {
      name: 'Pure Turmeric',
      type: 'turmeric',
      icon: '🟨',
      description: 'High curcumin content with lab verification',
      features: ['5.2% Curcumin', 'No Adulteration', 'Lab Verified']
    },
    {
      name: 'Fresh Banana',
      type: 'banana',
      icon: '🍌',
      description: 'Organic bananas with harvest-to-shelf tracking',
      features: ['Organic', 'Fresh Harvest', 'Cold Chain']
    }
  ];

  const features = [
    {
      icon: '🔐',
      title: 'Blockchain Secured',
      description: 'Every product is immutably recorded on blockchain for complete transparency and trust.'
    },
    {
      icon: '✓',
      title: 'Quality Verified', 
      description: 'Rigorous verification process ensures only premium, authentic products reach you.'
    },
    {
      icon: '👨‍🌾',
      title: 'Farmer Direct',
      description: 'Connect directly with verified farmers, ensuring fair prices and sustainable practices.'
    },
    {
      icon: '📱',
      title: 'Easy Verification',
      description: 'Scan QR codes to verify product authenticity and view complete supply chain history.'
    }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
   {/* Hero Section with Background Image & Brand Overlay */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: 'url("/images/fruits.jpg")' // Your custom fruit image
    }}
  ></div>
  
  {/* Brand Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-green-700/40"></div>
  
  {/* Dark Overlay for text readability */}
  <div className="absolute inset-0 bg-black/20"></div>
  
  {/* Content Container */}
  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
    
    {/* Main Heading with Stagger Animation */}
    <div className="stagger-children">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
        Trust in Every
      </h1>
      <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-accent">
        Transaction
      </h1>
    </div>
    
    {/* Subtitle with Animation */}
    <p className="text-xl md:text-2xl mb-8 leading-relaxed slide-in-up" style={{animationDelay: '0.4s'}}>
      Blockchain-verified agricultural products ensuring authenticity, quality, and transparency from farm to table.
    </p>
    
    {/* Buttons with Animation */}
    <div className="flex flex-col sm:flex-row justify-center gap-4 slide-in-up" style={{animationDelay: '0.6s'}}>
      <Link to="/products" className="btn-primary text-lg px-8 py-4 bg-accent text-dark hover:bg-yellow-500 transform hover:scale-105 transition duration-300">
        Browse Verified Products
      </Link>
      <Link to="/about" className="btn-secondary text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary transform hover:scale-105 transition duration-300">
        Learn How It Works
      </Link>
    </div>
    
  </div>
</section>
     

      {/* Features Section */}
      {/* Features Section */}
{/* Features Section with Colored SVG Images */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12 slide-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Why Choose ProAuthenticate?
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        We're revolutionizing agricultural supply chains with cutting-edge blockchain technology
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
      {[
        {
          image: '/images/icons/blockchain.png',
          title: 'Blockchain Secured',
          description: 'Every product is immutably recorded on blockchain for complete transparency and trust.',
          bgColor: 'bg-blue-100',
          iconColor: 'text-blue-600'
        },
        {
          image: '/images/icons/service.png',
          title: 'Quality Verified',
          description: 'Rigorous verification process ensures only premium, authentic products reach you.',
          bgColor: 'bg-green-100',
          iconColor: 'text-green-600'
        },
        {
          image: '/images/icons/fields.png',
          title: 'Farmer Direct',
          description: 'Connect directly with verified farmers, ensuring fair prices and sustainable practices.',
          bgColor: 'bg-orange-100',
          iconColor: 'text-orange-600'
        },
        {
          image: '/images/icons/qr-code.png',
          title: 'Easy Verification',
          description: 'Scan QR codes to verify product authenticity and view complete supply chain history.',
          bgColor: 'bg-purple-100',
          iconColor: 'text-purple-600'
        }
      ].map((feature, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-lg card-hover text-center">
          <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 bounce-in`}>
            <img 
              src={feature.image} 
              alt={`${feature.title} Icon`}
              className={`w-8 h-8 ${feature.iconColor}`}
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 slide-in-up">{feature.title}</h3>
          <p className="text-gray-600 leading-relaxed slide-in-up" style={{animationDelay: '0.1s'}}>
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose ProAuthenticate?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing agricultural supply chains with cutting-edge blockchain technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg card-hover text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Products Section */}
      {/* Products Preview Section */}
<section className="py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center text-dark mb-12">
      Our Authenticated Products
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { 
          name: 'Premium Sugar', 
          type: 'sugar', 
          description: 'Pure organic sugarcane with blockchain verification',
          image: '/images/sugar.jpg'  // Your actual image
        },
        { 
          name: 'Quality Cashew', 
          type: 'cashew', 
          description: 'Grade W240 raw cashews, direct from farms',
          image: '/images/cashew.jpg'  // Your actual image
        },
        { 
          name: 'Pure Turmeric', 
          type: 'turmeric', 
          description: 'High curcumin content with lab verification',
          image: '/images/turmeric.jpg'  // Your actual image
        },
        { 
          name: 'Fresh Banana', 
          type: 'banana', 
          description: 'Organic bananas with harvest-to-shelf tracking',
          image: '/images/banana.jpg'  // Your actual image
        }
      ].map((product, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 card-hover">
          {/* Product Image */}
          <div className="w-full h-48 bg-gray-200">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTZhYiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
              }}
            />
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2 text-dark">{product.name}</h3>
            <div className="flex items-center text-sm text-green-600 mb-2">
              <span className="bg-green-100 px-2 py-1 rounded text-xs font-medium">
                Blockchain Verified
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            <Link 
              to="/products" 
              className="text-primary hover:underline font-medium text-sm"
            >
              View Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Authenticated Products
            </h2>
            <p className="text-xl text-gray-600">Premium quality, blockchain verified</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg card-hover border border-gray-200">
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <span className="text-6xl">{product.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700 mb-1">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      Blockchain Verified
                    </span>
                    <Link 
                      to="/products" 
                      className="text-primary hover:text-green-700 font-medium text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary px-8 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="bg-gray-400 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the Authentication Revolution?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a farmer looking to get fair value for your quality products or a customer wanting guaranteed authenticity, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/farmer-login" className="btn-primary bg-accent text-dark hover:bg-yellow-500 px-8 py-4">
              Start Selling Verified Products
            </Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-secondary px-8 py-4">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;