import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/productsData';
import Lottie from 'lottie-react';
import tractorAnimation from '../components/Tractor.json'; // Adjust path based on where you placed the JSON file

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    {
      src: '/images/slider/slide1.jpg',
      alt: 'Western Maharashtra Agriculture',
      title: 'Harvesting Excellence,',
      subtitle: 'Sharing Abundance'
    },
    {
      src: '/images/slider/slide2.jpg',
      alt: 'Grape Cultivation',
      title: 'Your Trusted Agri-Commodity',
      subtitle: 'Export Partner!'
    },
    {
      src: '/images/slider/slide3.jpg',
      alt: 'Sugar Production',
      title: 'Harvesting Excellence,',
      subtitle: 'Sharing Abundance'
    },
    {
      src: '/images/slider/slide4.jpg',
      alt: 'Turmeric Fields',
      title: 'Your Trusted Agri-Commodity',
      subtitle: 'Export Partner!'
    },
    {
      src: '/images/slider/slide5.jpg',
      alt: 'Rice Cultivation',
      title: 'Harvesting Excellence,',
      subtitle: 'Sharing Abundance'
    },
    {
      src: '/images/slider/slide6.jpg',
      alt: 'Cashew Processing',
      title: 'Your Trusted Agri-Commodity',
      subtitle: 'Export Partner!'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  // Auto-slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Get featured products (first 3 from your data)
  const featuredProducts = products.slice(0, 3);

  const corePrinciples = [
    {
      title: 'Legacy-Driven Branding',
      description: 'We craft messages that transcend commerce—rooted in dynastic pride, cultural depth, and timeless value.'
    },
    {
      title: 'Legal Immunity & Compliance',
      description: 'Our operations are fortified by masterful legal drafting, ensuring institutional protection across borders.'
    },
    {
      title: 'Regional Upliftment',
      description: 'We champion Western Maharashtra\'s agriculture, manufacturing, and wellness sectors, turning local excellence into global trade.'
    },
    {
      title: 'Strategic Communication',
      description: 'Every word we write—whether in English or Marathi—is designed for emotional resonance, clarity, and institutional impact.'
    },
    {
      title: 'Global Market Integration',
      description: 'We connect local producers to international buyers through curated catalogues, export strategies, and trade intelligence.'
    },
    {
      title: 'Collaborative Dynasty Building',
      description: 'Our founder and partner desks reflect shared ambition—uniting families, regions, and legacies under one transformative vision.'
    }
  ];

  const westernMaharashtraAdvantages = [
    {
      icon: '📍',
      title: 'Strategic Location',
      description: 'Proximity to Mumbai and JNPT port ensures seamless logistics and export connectivity.'
    },
    {
      icon: '🏛️',
      title: 'Institutional Strength',
      description: 'Cooperative models, FPOs, and industrial clusters foster organized trade and scalability.'
    },
    {
      icon: '👨‍🔬',
      title: 'Skilled Workforce',
      description: 'A blend of traditional artisans, agripreneurs, and tech-savvy professionals fuels innovation and quality.'
    },
    {
      icon: '🏢',
      title: 'Government Support',
      description: 'Incentives for food processing, textile exports, and MSME growth make the region investor-friendly.'
    }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section - Image Slider */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Image Slider */}
        <div className="absolute inset-0">
          {sliderImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 transform scale-105'
                  : 'opacity-0 transform scale-100'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOWNhNmFiIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SGVybyBJbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
                }}
              />
              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 z-10 group"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-white group-hover:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 z-10 group"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-white group-hover:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          
          {/* Main Heading with Stagger Animation */}
          <div className="stagger-children">
            <h1 className="text-5xl md:text-5xl font-bold mb-4 leading-tight">
              {sliderImages[currentSlide].title}
            </h1>
            <h1 className="text-5xl md:text-5xl font-bold mb-8 leading-tight text-yellow-300">
              {sliderImages[currentSlide].subtitle}
            </h1>
          </div>
          
          {/* Buttons with Animation */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 slide-in-up" style={{animationDelay: '0.6s'}}>
            <Link to="/products" className="btn-primary text-lg px-8 py-4 bg-yellow-500 text-gray-900 hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 ease-out shadow-lg hover:shadow-xl font-bold">
              KNOW MORE
            </Link>
            <Link to="/about" className="btn-secondary text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300 ease-out">
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Elites Global Core Principles Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Geometric Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-gray-50 to-green-50 rounded-full translate-x-1/2 translate-y-1/2 opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header with Modern Typography */}
          <div className="text-center mb-20">
            {/* Company Logo Added Here */}
            <div className="flex justify-center mb-8">
  <div className="max-w-xs w-48 h-48 flex items-center justify-center"> {/* Max width constraint */}
    <img 
      src="/images/logo/elitess-logo.png" 
      alt="Elitess Global" 
      className="w-full h-full object-contain rounded-full"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
      }}
    />
    <div className="max-w-xs w-48 h-48 bg-gradient-to-br from-primary to-green-600 rounded-full hidden items-center justify-center shadow-lg">
      <span className="text-white font-bold text-6xl">E</span>
    </div>
  </div>
</div>

            <div className="inline-block mb-6">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                The <span className="relative">
                  <span className="text-green-600">Elitess Global</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-green-200 transform -skew-x-12"></span>
                </span> Advantage
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              More than a company—we are a movement to elevate Western Maharashtra's excellence onto the world stage. 
              Founded by visionary legal strategist Vaibhav, we blend institutional rigor with poetic ambition.
            </p>
          </div>

          {/* Rest of your existing code remains the same... */}
          {/* Updated Products Section with Your Product Data */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-dark mb-12 slide-in-up">
                Our Premium Agricultural Products
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 card-hover"
                    style={{
                      animationDelay: `${index * 0.15}s`,
                      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }}
                  >
                    {/* Product Image */}
                    <div className="relative w-full h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTZhYiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                        <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                          <span className="bg-white/90 text-green-700 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                            View Details
                          </span>
                        </div>
                      </div>
                      {/* Product Icon */}
                      <div className="absolute top-4 left-4 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                        <span className="text-lg">{product.icon}</span>
                      </div>
                    </div>
                    
                    {/* Product Content */}
                    <div className="p-6 transform transition-transform duration-300 group-hover:translate-x-2">
                      <h3 className="font-semibold text-xl mb-2 text-dark group-hover:text-green-700 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-green-600 font-medium text-sm mb-3 italic">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center text-sm text-green-600 mb-3">
                        
                      </div>

                      {/* Truncated Description with View More Link */}
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {product.shortDescription}
                        </p>
                        <Link 
                          to={`/products/${product.slug}`}
                          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-xs mt-2 transition-all duration-300 group/view-more"
                        >
                          <span className="transform group-hover/view-more:translate-x-1 transition-transform duration-300">
                            View More Details
                          </span>
                          <span className="ml-1 transform group-hover/view-more:translate-x-1 transition-transform duration-300 delay-100">
                            →
                          </span>
                        </Link>
                      </div>

                      {/* Varieties */}
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-800 text-sm mb-2">Varieties & Forms:</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.varieties.slice(0, 3).map((variety, idx) => (
                            <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700 border border-gray-200">
                              {variety}
                            </span>
                          ))}
                          {product.varieties.length > 3 && (
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-500 border border-gray-200">
                              +{product.varieties.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Global Appeal */}
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-800 text-sm mb-1">Global Appeal:</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {product.globalAppeal}
                        </p>
                      </div>

                      {/* Value Additions */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 text-sm mb-2">Value Addition:</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.valueAdditions.slice(0, 2).map((addition, idx) => (
                            <span key={idx} className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs border border-amber-200">
                              {addition}
                            </span>
                          ))}
                          {product.valueAdditions.length > 2 && (
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs border border-amber-200">
                              +{product.valueAdditions.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Link 
                        to={`/products/${product.slug}`}
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-all duration-300 group/link"
                      >
                        <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">
                          Explore {product.name}
                        </span>
                        <span className="ml-1 transform group-hover/link:translate-x-1 transition-transform duration-300 delay-100">
                          →
                        </span>
                      </Link>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                ))}
              </div>

              {/* View All Products Button */}
              <div className="text-center mt-12 slide-in-up" style={{animationDelay: '0.6s'}}>
                <Link 
                  to="/products" 
                  className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-500 ease-out shadow-lg"
                >
                  <span>View All Premium Products</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Updated Core Principles Grid with Green Background */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {corePrinciples.map((principle, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-8 border-2 border-green-400 hover:border-green-300 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-white/40 to-white/20 rounded-t-xl opacity-100 group-hover:from-white/60 group-hover:to-white/40 transition-all duration-300"></div>
                
                <div className="flex flex-col h-full">
                  {/* Icon and Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-3xl text-white group-hover:text-green-100 transition-colors duration-300">
                      {index === 0 ? '🏛️' : 
                       index === 1 ? '⚖️' : 
                       index === 2 ? '🌍' : 
                       index === 3 ? '💬' : 
                       index === 4 ? '🌐' : '🤝'}
                    </div>
                    
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-100 transition-colors duration-300 leading-tight">
                      {principle.title}
                    </h3>
                    <p className="text-green-100 leading-relaxed text-[15px] font-medium group-hover:text-white transition-colors duration-300">
                      {principle.description}
                    </p>
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-125">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>

                {/* Background Pattern on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/10 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Mission Statement with Modern Layout */}
          <div className="text-center">
            <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-12 border-2 border-green-100 max-w-6xl mx-auto overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 border-4 border-green-300 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-4 border-emerald-300 rounded-full translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10">
               
                {/* Quote */}
                <blockquote className="text-2xl text-gray-800 italic mb-8 leading-relaxed font-light max-w-4xl mx-auto">
                  "At Elitess Global, every product is a message. Every transaction is a legacy. Every partner is a co-architect of transformation."
                </blockquote>
                
                {/* Separator */}
                <div className="flex items-center justify-center mb-8">
                  <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                </div>
                
                {/* Mission Content */}
                <div className="text-gray-700 leading-relaxed space-y-6 max-w-4xl mx-auto">
                  <p className="text-lg font-medium">
                    We specialize in export-import solutions that honor the soul of our region—its agriculture, craftsmanship, and entrepreneurial spirit. 
                  </p>
                  <p className="text-lg font-medium">
                    From turmeric fields to diamond workshops, our mission is to craft enduring value, protect institutional integrity, and build dynasties of prosperity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation Dots */}
          <div className="flex justify-center mt-16 space-x-3">
            {[1, 2, 3].map((dot) => (
              <div key={dot} className={`w-2 h-2 rounded-full transition-all duration-300 ${
                dot === 2 ? 'bg-green-600 w-6' : 'bg-gray-300'
              }`}></div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Western Maharashtra for Global Trade Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Section Container with relative positioning for tractor */}
        <div className="relative">
          {/* Moving Tractor Animation - POSITIONED ABOVE TEXT */}
          <div className="absolute -top-20 left-0 right-0 z-10 pointer-events-none overflow-hidden h-40">
            <div className="tractor-move-animation">
              <Lottie 
                animationData={tractorAnimation}
                loop={true}
                autoplay={true}
                className="w-40 h-40"
                style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}
              />
            </div>
          </div>

          {/* Geometric Background Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-gray-50 to-green-50 rounded-full translate-x-1/2 translate-y-1/2 opacity-60"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Header with Modern Typography - NOW BELOW TRACTOR */}
            <div className="text-center mb-20 pt-16"> {/* Added pt-16 for spacing below tractor */}
              <div className="inline-block mb-6">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-4"></div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Why <span className="relative">
                    <span className="text-green-600">Western Maharashtra</span>
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-green-200 transform -skew-x-12"></span>
                  </span> for Global Trade?
                </h2>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                A strategic hub combining traditional excellence with modern infrastructure for seamless international trade
              </p>
            </div>

            {/* Advantages Grid with Clean Layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {westernMaharashtraAdvantages.map((advantage, index) => (
                <div 
                  key={index}
                  className="group relative bg-white rounded-xl p-8 border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Top Accent Bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex flex-col h-full">
                    {/* Icon without Background */}
                    <div className="flex items-center mb-6">
                      <div className="text-3xl mr-4 text-green-600 group-hover:text-green-700 transition-colors duration-300">
                        {advantage.icon}
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300 leading-tight">
                        {advantage.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-[15px] font-light">
                        {advantage.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Elites Global's Role Section */}
            <div className="text-center">
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 border border-gray-200 max-w-6xl mx-auto overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-32 h-32 border-2 border-green-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 border-2 border-emerald-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
                </div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-12">
                    <div className="inline-block mb-6">
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-4"></div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Bridging <span className="relative">
                          <span className="text-green-600">Legacy</span>
                          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-200 transform -skew-x-12"></span>
                        </span> and <span className="relative">
                          <span className="text-emerald-600">Opportunity</span>
                          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-200 transform -skew-x-12"></span>
                        </span>
                      </h3>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Content */}
                    <div className="space-y-6">
                      <p className="text-lg text-gray-700 leading-relaxed font-light">
                        Your platform can position Western Maharashtra as a global trade powerhouse—connecting its sugar, textiles, fruits, and handicrafts to buyers across continents.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed font-light">
                        By offering compliance-ready documentation, branding support, and strategic matchmaking, Elitess Global becomes the gateway through which regional excellence meets international demand.
                      </p>
                    </div>

                    {/* Right Content - Clean List */}
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <div className="text-2xl text-green-600 mr-4">✓</div>
                        <h4 className="text-xl font-bold text-gray-900">Our Strategic Value</h4>
                      </div>
                      
                      <ul className="space-y-4">
                        {[
                          "Compliance-ready documentation",
                          "Premium branding and packaging support",
                          "Strategic international matchmaking",
                          "Logistics and supply chain optimization",
                          "Market intelligence and trade insights"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start group">
                            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mr-4 mt-0.5">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                            </div>
                            <span className="text-gray-700 font-light group-hover:text-gray-900 transition-colors duration-300">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="flex items-center justify-center my-12">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="text-center">
                    <p className="text-gray-600 font-light mb-4">Ready to transform regional excellence into global success?</p>
                    <div className="flex justify-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add CSS for tractor animation */}
      <style jsx>{`
        .tractor-move-animation {
          animation: moveTractor 25s linear infinite;
          will-change: transform;
        }

        @keyframes moveTractor {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }

        @media (max-width: 768px) {
          .tractor-move-animation {
            animation: moveTractor 20s linear infinite;
          }
          
          @keyframes moveTractor {
            0% {
              transform: translateX(-50px);
            }
            100% {
              transform: translateX(calc(100vw + 50px));
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Home;