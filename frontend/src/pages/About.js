import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      description: 'Agricultural tech entrepreneur with 15+ years in supply chain innovation',
      expertise: ['Blockchain', 'Supply Chain', 'Agriculture']
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Verification',
      description: 'Quality assurance expert with background in food science and technology',
      expertise: ['Quality Control', 'Food Safety', 'Certification']
    },
    {
      name: 'Arun Patel',
      role: 'Blockchain Lead',
      description: 'Blockchain developer specializing in supply chain applications',
      expertise: ['Smart Contracts', 'Web3', 'Security']
    },
    {
      name: 'Meera Nair',
      role: 'Farmer Relations',
      description: 'Agricultural economist connecting farmers with premium markets',
      expertise: ['Farmer Outreach', 'Market Access', 'Sustainability']
    }
  ];

  const milestones = [
    { year: '2023', event: 'Elites Global Founded', description: 'Started with vision to bring transparency to agriculture' },
    { year: '2024 Q1', event: 'Blockchain Platform Launch', description: 'First version of authentication platform deployed' },
    { year: '2024 Q2', event: '100+ Farmers Onboarded', description: 'Reached milestone of verified farming partners' },
    { year: '2024 Q3', event: 'International Expansion', description: 'Started operations in multiple states across India' }
  ];

  const sustainabilityPillars = [
    {
      icon: '🌍',
      title: 'Environmental Stewardship',
      description: 'Promoting sustainable farming practices that protect our planet',
      initiatives: [
        'Water conservation through drip irrigation',
        'Organic farming certification programs',
        'Carbon footprint reduction strategies',
        'Biodiversity preservation efforts'
      ]
    },
    {
      icon: '👨‍🌾',
      title: 'Farmer Prosperity',
      description: 'Ensuring fair compensation and better livelihoods for farming communities',
      initiatives: [
        'Direct farmer-to-market connections',
        'Fair price assurance mechanisms',
        'Financial literacy programs',
        'Access to modern farming technology'
      ]
    },
    {
      icon: '🏛️',
      title: 'Community Development',
      description: 'Building resilient agricultural communities for future generations',
      initiatives: [
        'Women farmer empowerment programs',
        'Youth agricultural training',
        'Rural infrastructure development',
        'Education and healthcare access'
      ]
    },
    {
      icon: '🔄',
      title: 'Circular Economy',
      description: 'Creating sustainable supply chains with minimal waste',
      initiatives: [
        'Waste-to-value conversion',
        'Packaging optimization',
        'Supply chain efficiency',
        'Renewable energy adoption'
      ]
    }
  ];

  const sustainabilityGoals = [
    {
      target: '50%',
      description: 'Reduction in water usage through smart irrigation by 2025'
    },
    {
      target: '10,000+',
      description: 'Farmers trained in sustainable practices by 2026'
    },
    {
      target: '100%',
      description: 'Traceable supply chains with blockchain verification by 2025'
    },
    {
      target: 'Zero',
      description: 'Chemical pesticide usage in certified organic products'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Elites Global</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              We're on a mission to revolutionize agricultural supply chains through blockchain technology, 
              ensuring trust and transparency from farm to table.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  As a founder of Elites Global, I am honored to stand beside a vision that transcends trade—it uplifts legacy.
                  Our journey began with a simple yet powerful realization: Western Maharashtra is not just a region—it is a reservoir of excellence. From the fertile fields of Kolhapur to the textile artistry of Ichalkaranji, from the engineering brilliance of Pune to the handcrafted heritage of Solapur, our land produces with pride, precision, and purpose. Yet, much of this brilliance remained confined to local markets.
                  Elites Global was born to change that.
                </p>
                <p>
                  Together with my founding partner, we envisioned a platform that would not only facilitate international trade but elevate it—anchored in compliance, clarity, and cultural dignity. We believe that every farmer, artisan, and manufacturer deserves a gateway to global prosperity. Our platform is that gateway.
                  Elites Global is more than a business—it is a movement. A movement to transform effort into ease, production into prestige, and regional pride into international recognition. We are building a legacy where trade becomes a tool of dynastic upliftment, institutional strength, and generational fortune.
                  To every stakeholder who joins us—know that you are not just trading. You are transforming.
                </p>
                <p>
                  <p>Warm regards, </p> 
                  <p>Vaibhav Ananda Patil </p> 
                  <p> MBA, LLM (International Trade Laws)  </p>  
                  <p>Co-Founder, Elites Global</p>
                  Mob: 9604127449    
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-2xl font-semibold text-gray-800">From Farm to Family</h3>
                <p className="text-gray-600 mt-2">Building trust in every transaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mb-6">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                <p>To establish Elite Global as the world's most trusted and transformative export
                import platform—where trade becomes a vehicle for prosperity, legacy, and 
                institutional upliftment. </p> 
                <p>We envision a future where families, founders, and regions rise through seamless 
                global commerce. Elite Global will be the bridge between Western Maharashtra's 
                entrepreneurial spirit and the world's demand, enabling dignified growth, 
                strategic alliances, and generational wealth. Our platform shall embody precision, 
                immunity, and elegance—making international trade not just accessible, but 
                aspirational.</p>
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mb-6">
                🔭
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                <b>Elite Global is committed to: </b>  
                <br></br>
                <b>• Empowering Trade with Precision:   </b>
                <p>Delivering a platform that simplifies complex export-import processes with 
                clarity, compliance, and institutional immunity—ensuring every transaction is 
                secure, transparent, and future-proof.</p> 
                <b>• Elevating Regional Identity:   </b>
                <p>Showcasing the excellence of Western Maharashtra's trade corridor—its 
                agricultural, artisanal, and industrial strengths—on the global stage, with pride 
                and strategic branding. </p>
                <b>• Building Prosperity Through Partnerships: </b> 
                <p>Cultivating enduring relationships with exporters, importers, governments, and 
                institutions—where mutual growth is anchored in trust, timeliness, and shared 
                vision. </p>
                <b>• Innovating for Ease and Elegance: </b>  
                <p>Integrating smart documentation, real-time tracking, and multilingual support to 
                make global trade not just efficient, but graceful—honoring both tradition and 
                technology. </p>
                <b>• Uplifting Legacy and Dynastic Ambition: </b>  
                <p>Creating a platform where founders and families can build lasting legacies—
                transforming trade into a source of fortune, dignity, and generational upliftment. </p>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Commitment to Sustainability
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building a future where agriculture thrives in harmony with nature, communities prosper, 
              and generations to come inherit a healthier planet.
            </p>
          </div>

          {/* Sustainability Pillars */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {sustainabilityPillars.map((pillar, index) => (
              <div key={index} className="bg-green-50 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{pillar.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{pillar.description}</p>
                <ul className="space-y-2">
                  {pillar.initiatives.map((initiative, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {initiative}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Sustainability Goals */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold text-center mb-8">Our 2025 Sustainability Goals</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sustainabilityGoals.map((goal, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold mb-2">{goal.target}</div>
                  <p className="text-green-100 text-sm">{goal.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sustainable Practices */}
          <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Sustainable Farming Practices</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <span className="text-green-600 text-lg">💧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Water Management</h4>
                    <p className="text-gray-600 text-sm">Implementing drip irrigation and rainwater harvesting to reduce water consumption by up to 60%.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <span className="text-green-600 text-lg">🌿</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Organic Cultivation</h4>
                    <p className="text-gray-600 text-sm">Promoting natural pest control and organic fertilizers to maintain soil health and biodiversity.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <span className="text-green-600 text-lg">☀️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Renewable Energy</h4>
                    <p className="text-gray-600 text-sm">Solar-powered processing units and energy-efficient cold storage facilities.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <span className="text-green-600 text-lg">🔄</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Circular Economy</h4>
                    <p className="text-gray-600 text-sm">Converting agricultural waste into bio-fertilizers and renewable energy sources.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-green-200 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🌍</div>
                <h3 className="text-2xl font-semibold text-gray-800">Green Legacy</h3>
                <p className="text-gray-600 mt-2">Sustainable today, prosperous tomorrow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Sustainable Mission</h2>
          <p className="text-xl mb-8">
            Partner with us to build a more sustainable, transparent, and prosperous agricultural ecosystem for generations to come.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/farmer-login" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 px-8 py-4 rounded-lg font-semibold transition-colors">
              Join as Sustainable Farmer
            </Link>
            <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-4 rounded-lg font-semibold transition-colors">
              Partner for Sustainability
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;