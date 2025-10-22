import React from 'react';
import { Link } from 'react-router-dom';

const Sustainability = () => {
  // ESG Framework Data
  const esgPillars = [
    {
      category: "ENVIRONMENTAL",
      icon: "🌍",
      color: "from-green-500 to-emerald-600",
      items: [
        "Climate change strategy",
        "Biodiversity conservation",
        "Water efficiency",
        "Energy efficiency",
        "Carbon intensity reduction",
        "Environmental management system"
      ]
    },
    {
      category: "SOCIAL",
      icon: "🤝",
      color: "from-green-500 to-emerald-600",
      items: [
        "Equal opportunities",
        "Freedom of association",
        "Health and safety",
        "Human rights protection",
        "Customer & products responsibility",
        "Child labour prevention"
      ]
    },
    {
      category: "GOVERNANCE",
      icon: "⚖️",
      color: "from-green-500 to-emerald-600",
      items: [
        "Business ethics",
        "Compliance excellence",
        "Board independence",
        "Executive compensation",
        "Shareholder democracy"
      ]
    }
  ];

  // Impact Metrics
  const impactMetrics = [
    { number: '25,000+', label: 'Acres under sustainable farming' },
    { number: '15,000+', label: 'Farmers empowered' },
    { number: '60%', label: 'Water saved through innovation' },
    { number: '5,000+', label: 'Tonnes CO₂ reduced annually' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Directly below navbar */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-800 text-white py-16 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sustainability & ESG
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-4xl mx-auto">
            Trade as a Tool for Sustainability, Upliftment, and Legacy
          </p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            In an era where commerce shapes civilizations, Elites Global emerges not merely as an export-import platform, 
            but as a movement—one that redefines trade as a force for sustainability, social upliftment, and economic transformation.
          </p>
        </div>
      </section>

      {/* ESG Framework Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our ESG Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rooted in the fertile enterprise of Western Maharashtra and reaching toward global markets, 
              Elites Global is built on the belief that prosperity must be purposeful, and legacy must be inclusive.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {esgPillars.map((pillar, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${pillar.color} text-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="text-4xl mb-4 text-center">{pillar.icon}</div>
                <h3 className="text-2xl font-bold mb-6 text-center">{pillar.category}</h3>
                <ul className="space-y-3">
                  {pillar.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <span className="mr-3">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Vision Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Sustainability: Commerce with Conscience
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-lg text-justify mb-6">
                Elites Global's sustainability vision begins with the soil. We champion climate-resilient agriculture, 
                promote residue-free produce, and encourage eco-conscious packaging—ensuring that every exported product 
                carries the imprint of environmental respect.
              </p>
              
              <p className="text-lg text-justify mb-6">
                Our logistics model is designed to minimize carbon footprints through optimized routing and multimodal transport, 
                while our partnerships prioritize organic, fair-trade, and regenerative practices.
              </p>
              
              <p className="text-lg text-justify">
                But sustainability for us is not limited to ecology—it extends to economic and institutional resilience. 
                We advocate for circular value chains, where waste becomes input, and where every stakeholder—from farmer 
                to freight forwarder—benefits from long-term viability. In doing so, Elites Global becomes a platform where 
                trade respects tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Responsibility Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Social Responsibility: Dignity in Every Transaction
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-justify">
                  At the heart of Elites Global lies a commitment to human dignity. We believe that every farmer, 
                  artisan, and manufacturer deserves not just access to global markets, but protection, recognition, 
                  and fair reward.
                </p>
                <p className="text-justify">
                  Our platform ensures transparent contracts, multilingual documentation, and legal clarity—shielding 
                  stakeholders from exploitation and empowering them with institutional immunity.
                </p>
                <p className="text-justify">
                  We actively promote gender inclusion, youth entrepreneurship, and cooperative enterprise. By supporting 
                  women-led businesses and training young exporters, we create a trade ecosystem that is not only productive 
                  but just.
                </p>
                <p className="text-justify">
                  Our branding efforts preserve cultural heritage—be it Kolhapuri chappals, turmeric, or jaggery—ensuring 
                  that tradition finds its place in modern commerce.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl relative">
                <img 
                  src="/images/Dignity.jpg" 
                  alt="Dignity in Trade - Fair trade practices showing hands exchanging products" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback if image doesn't load */}
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-gray-500 text-lg hidden absolute inset-0">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🤲</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Dignity in Trade</h3>
                    <p className="text-gray-600">Every transaction honors human worth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Upliftment Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl relative">
                <img 
                  src="/images/legacy.jpg" 
                  alt="Legacy Building - Community development and intergenerational wealth" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback if image doesn't load */}
                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center text-gray-500 text-lg hidden absolute inset-0">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Legacy Building</h3>
                    <p className="text-gray-600">Transforming labor into legacy</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Social Upliftment: Legacy Through Livelihood
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-justify">
                  Elites Global is a vehicle for dynastic upliftment. We envision families rising through trade—building 
                  intergenerational wealth, institutional pride, and regional identity.
                </p>
                <p className="text-justify">
                  Our platform supports skill development, cluster formation, and digital literacy, enabling communities 
                  to participate in global commerce with confidence and clarity.
                </p>
                <p className="text-justify">
                  We do not merely facilitate transactions—we cultivate transformation. By connecting local excellence to 
                  international demand, we turn effort into ease, labor into legacy, and production into prestige.
                </p>
                <p className="text-justify">
                  Every shipment from Western Maharashtra becomes a symbol of regional pride and global relevance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Economic Growth Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Economic Growth: From Regional Roots to Global Reach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elites Global is a catalyst for export-led development and sustainable prosperity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Market Expansion</h3>
              <p className="text-gray-600 text-justify">
                By unlocking international markets for Western Maharashtra's agricultural, manufacturing, 
                and artisanal products, we stimulate GDP growth, foreign exchange inflow, and employment generation.
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Investment Attraction</h3>
              <p className="text-gray-600 text-justify">
                Our platform attracts global investors through its transparency, compliance, and strategic 
                messaging—positioning the region as a trade powerhouse.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
            <p className="text-xl mb-4 text-justify">
              "We invest in infrastructure—digital, legal, and logistical—that serves not just today's exporters 
              but tomorrow's dynasties."
            </p>
            <p className="text-lg opacity-90 text-justify">
              Our goal is to build an ecosystem where economic growth is not extractive but expansive, 
              not fleeting but foundational.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Measurable Impact
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {metric.number}
                </div>
                <p className="text-gray-600 font-medium">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Commitment Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Our Commitment to Lasting Legacy
            </h2>
            <p className="text-lg md:text-xl mb-6 text-justify">
              In essence, Elites Global is more than a company—it is a commitment. A commitment to trade that uplifts, 
              to commerce that sustains, and to legacy that lasts.
            </p>
            <p className="text-lg md:text-xl text-justify">
              Through every transaction, we honor the soil, the soul, and the spirit of Western Maharashtra—transforming 
              it into a beacon of global prosperity.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Sustainable Trade Revolution
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Partner with us to build a more sustainable, transparent, and prosperous 
            agricultural ecosystem for generations to come.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/farmer-login"
              className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Join as Sustainable Partner
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Learn More About ESG
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;