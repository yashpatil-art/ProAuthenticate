import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Elites Global
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              We're on a mission to revolutionize agricultural supply chains
              through blockchain technology, ensuring trust and transparency
              from farm to table.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story - Fixed Alignment */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Text Content - Left Side */}
            <div className="flex flex-col justify-start h-full">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                Founder's Desk
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg text-justify">
                  As a founder of Elites Global, I am honored to stand beside a
                  vision that transcends trade—it uplifts legacy. Our journey
                  began with a simple yet powerful realization: Western
                  Maharashtra is not just a region—it is a reservoir of
                  excellence.
                </p>
                <p className="text-lg text-justify">
                  From the fertile fields of Kolhapur to the textile artistry of
                  Ichalkaranji, from the engineering brilliance of Pune to the
                  handcrafted heritage of Solapur, our land produces with
                  pride, precision, and purpose. Yet, much of this brilliance
                  remained confined to local markets. Elites Global was born to
                  change that.
                </p>
                <p className="text-lg text-justify">
                  Together with my founding partner, we envisioned a platform
                  that would not only facilitate international trade but elevate
                  it—anchored in compliance, clarity, and cultural dignity. We
                  believe that every farmer, artisan, and manufacturer deserves
                  a gateway to global prosperity.
                </p>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg my-6">
                  <p className="text-xl font-semibold text-gray-800 italic leading-relaxed text-justify">
                    "Elites Global is more than a business—it is a movement. A
                    movement to transform effort into ease, production into
                    prestige, and regional pride into international recognition."
                  </p>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <p className="font-semibold text-gray-800 text-lg mb-2">
                    Warm regards,
                  </p>
                  <p className="text-gray-700 font-medium text-lg">
                    Vaibhav Ananda Patil
                  </p>
                  <p className="text-gray-600">
                    MBA, LLM (International Trade Laws)
                  </p>
                  <p className="text-gray-600">
                    Co-Founder, Elites Global
                  </p>
                  <p className="text-gray-600 mt-2 font-medium">
                    Mob: 9604127449
                  </p>
                </div>
              </div>
            </div>
            
            {/* Image Content - Right Side */}
            <div className="flex flex-col justify-start h-full">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/Farm.png" 
                  alt="Vaibhav Ananda Patil - Founder" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                {/* Fallback if image doesn't load */}
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-gray-500 text-lg hidden">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📸</div>
                    <p>Image not found</p>
                  </div>
                </div>
              </div>
              
              {/* Optional: Add some text below the image for better balance */}
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  From Farm to Family
                </h3>
                <p className="text-gray-600">
                  Building trust in every transaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with Simple Animations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white text-2xl mb-6 shadow-md transform group-hover:scale-110 transition duration-500">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 transform group-hover:translate-x-2 transition duration-500">
                Our Mission
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg text-justify transform group-hover:translate-x-1 transition duration-500 delay-100">
                  To establish <span className="font-semibold text-green-700">Elite Global</span> as the world's most trusted and
                  transformative export-import platform—where trade becomes a
                  vehicle for prosperity, legacy, and institutional upliftment.
                </p>
                <p className="text-lg text-justify transform group-hover:translate-x-1 transition duration-500 delay-200">
                  We envision a future where families, founders, and regions
                  rise through seamless global commerce. Elite Global will be
                  the bridge between Western Maharashtra's entrepreneurial
                  spirit and the world's demand, enabling dignified growth,
                  strategic alliances, and generational wealth.
                </p>
                <p className="text-lg font-medium text-green-700 text-justify transform group-hover:translate-x-1 transition duration-500 delay-300">
                  Our platform shall embody precision, immunity, and elegance—making
                  international trade not just accessible, but aspirational.
                </p>
              </div>
            </div>
            
            {/* Vision Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white text-2xl mb-6 shadow-md transform group-hover:scale-110 transition duration-500">
                🔭
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 transform group-hover:translate-x-2 transition duration-500">
                Our Vision
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="font-semibold text-gray-800 text-lg mb-4 transform group-hover:translate-x-1 transition duration-500">
                  Elite Global is committed to:
                </p>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Empowering Trade with Precision",
                      description: "Delivering a platform that simplifies complex export-import processes with clarity, compliance, and institutional immunity—ensuring every transaction is secure, transparent, and future-proof."
                    },
                    {
                      title: "Elevating Regional Identity",
                      description: "Showcasing the excellence of Western Maharashtra's trade corridor—its agricultural, artisanal, and industrial strengths—on the global stage, with pride and strategic branding."
                    },
                    {
                      title: "Building Prosperity Through Partnerships",
                      description: "Cultivating enduring relationships with exporters, importers, governments, and institutions—where mutual growth is anchored in trust, timeliness, and shared vision."
                    },
                    {
                      title: "Innovating for Ease and Elegance",
                      description: "Integrating smart documentation, real-time tracking, and multilingual support to make global trade not just efficient, but graceful—honoring both tradition and technology."
                    },
                    {
                      title: "Uplifting Legacy and Dynastic Ambition",
                      description: "Creating a platform where founders and families can build lasting legacies—transforming trade into a source of fortune, dignity, and generational upliftment."
                    }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start transform group-hover:translate-x-1 transition duration-500"
                      style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                    >
                      <div className="bg-green-100 p-2 rounded-lg mr-4 flex-shrink-0 mt-1 transform group-hover:scale-110 transition duration-300">
                        <span className="text-green-600 font-bold text-sm">•</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed text-justify">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision and action we take
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤝",
                title: "Trust & Transparency",
                description: "Building relationships based on honesty and clear communication in every transaction"
              },
              {
                icon: "🌱",
                title: "Sustainability",
                description: "Ensuring our practices benefit both people and the planet for generations"
              },
              {
                icon: "🚀",
                title: "Innovation",
                description: "Leveraging cutting-edge technology to transform traditional trade practices"
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="group text-center p-8 bg-gray-50 rounded-xl hover:bg-green-50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition duration-500">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 transform group-hover:translate-y-1 transition duration-500">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed transform group-hover:translate-y-1 transition duration-500 delay-100">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;