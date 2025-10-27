import React from 'react';
import { Link } from 'react-router-dom';

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Elitess Global Partners with Maharashtra Farmers for Sustainable Agriculture",
      excerpt: "We are proud to announce our new partnership with local farmers in Western Maharashtra to promote sustainable farming practices and blockchain-based supply chain transparency.",
      date: "December 15, 2024",
      category: "Partnership",
      image: "/images/news/farmers-partnership.jpg",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Blockchain Technology Revolutionizes Agricultural Supply Chains",
      excerpt: "Discover how Elitess Global is leveraging blockchain to bring unprecedented transparency and trust to agricultural product tracking from farm to consumer.",
      date: "December 10, 2024",
      category: "Technology",
      image: "/images/news/blockchain-agri.jpg",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Export Expansion: Elitess Global Enters European Markets",
      excerpt: "Our premium agricultural products are now available in European markets, bringing the authentic taste of Western Maharashtra to international consumers.",
      date: "December 5, 2024",
      category: "Business",
      image: "/images/news/europe-expansion.jpg",
      readTime: "2 min read"
    },
    {
      id: 4,
      title: "Sustainable Farming Practices Workshop in Kolhapur",
      excerpt: "Join our upcoming workshop on sustainable farming techniques and learn how to implement eco-friendly practices while increasing productivity.",
      date: "November 28, 2024",
      category: "Events",
      image: "/images/news/workshop.jpg",
      readTime: "2 min read"
    },
    {
      id: 5,
      title: "Elitess Global Achieves ISO 9001:2015 Certification",
      excerpt: "We are delighted to announce that Elitess Global has been awarded the ISO 9001:2015 certification for quality management systems.",
      date: "November 20, 2024",
      category: "Achievement",
      image: "/images/news/iso-certification.jpg",
      readTime: "3 min read"
    },
    {
      id: 6,
      title: "New Mobile App Launch for Farmers and Customers",
      excerpt: "Our new mobile application makes it easier for farmers to list products and for customers to track their orders with real-time updates.",
      date: "November 15, 2024",
      category: "Product Launch",
      image: "/images/news/mobile-app.jpg",
      readTime: "3 min read"
    }
  ];

  const categories = ["All", "Partnership", "Technology", "Business", "Events", "Achievement", "Product Launch"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Updates</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest developments, partnerships, and achievements at Elitess Global
            </p>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition duration-300 font-medium"
              >
                {category}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group">
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-green-600">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📰</div>
                      <p className="text-sm">News Image</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm">{article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition duration-300 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{article.date}</span>
                    <Link 
                      to={`/news/${article.id}`}
                      className="text-green-600 hover:text-green-700 font-medium flex items-center transition duration-300 group-hover:translate-x-1"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-medium">
              Load More News
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss important updates about our products and services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;