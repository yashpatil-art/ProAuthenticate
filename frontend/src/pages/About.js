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
    { year: '2023', event: 'ProAuthenticate Founded', description: 'Started with vision to bring transparency to agriculture' },
    { year: '2024 Q1', event: 'Blockchain Platform Launch', description: 'First version of authentication platform deployed' },
    { year: '2024 Q2', event: '100+ Farmers Onboarded', description: 'Reached milestone of verified farming partners' },
    { year: '2024 Q3', event: 'International Expansion', description: 'Started operations in multiple states across India' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About ProAuthenticate</h1>
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
                  ProAuthenticate was born from a simple observation: consumers increasingly want to know where their food comes from, 
                  while farmers struggle to get fair value for their quality products.
                </p>
                <p>
                  We saw an opportunity to bridge this gap using blockchain technology. By creating an immutable, transparent record 
                  of every product's journey from farm to consumer, we're building trust in agricultural supply chains.
                </p>
                <p>
                  Today, we work with hundreds of farmers across India, helping them authenticate their products and connect with 
                  conscious consumers who value transparency and quality.
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
                To eliminate counterfeit products and build consumer confidence by providing irrefutable proof 
                of authenticity for every agricultural product, ensuring farmers get fair value and consumers get guaranteed quality.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mb-6">
                🔭
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become the global standard for agricultural product authentication, creating a world where 
                consumers can trust exactly what they're buying and farmers are rewarded for their quality and sustainability practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Passionate professionals driving the authentication revolution</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center card-hover">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.expertise.map((skill, idx) => (
                    <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{milestone.event}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-400 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8">
            Whether you're a farmer, consumer, or partner, there's a place for you in the ProAuthenticate community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/farmer-login" className="btn-primary bg-accent text-dark hover:bg-yellow-500 px-8 py-4">
              Join as Farmer
            </Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary px-8 py-4">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;