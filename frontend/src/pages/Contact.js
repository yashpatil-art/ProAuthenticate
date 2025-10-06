import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      type: 'general'
    });
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'info@proauthenticate.com',
      description: 'Send us an email anytime'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+91 98765 43210',
      description: 'Mon to Fri, 9AM to 6PM'
    },
    {
      icon: '🏢',
      title: 'Visit Us',
      details: 'Agricultural Tech Park, Mumbai',
      description: 'Come say hello at our office'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      details: '+91 98765 43210',
      description: 'Quick responses via WhatsApp'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Have questions about blockchain verification? Ready to join our platform? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Let's Start a Conversation</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Whether you're a farmer looking to authenticate your products, a buyer seeking verified agricultural goods, 
              or just curious about blockchain technology in agriculture, we're here to help.
            </p>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{method.title}</h3>
                    <p className="text-gray-700 font-medium">{method.details}</p>
                    <p className="text-gray-500 text-sm">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Farmers & Partners</h3>
              <p className="text-gray-600 text-sm">
                For farmers interested in joining our verification program or businesses looking to partner with us, 
                please mention your specific interest in the message section below.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="Enter your full name"
                  />
                </div>

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
                    placeholder="Enter your email"
                  />
                </div>
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
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="farmer">Farmer Registration</option>
                    <option value="buyer">Product Purchase</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="technical">Technical Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="Brief subject of your message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-4 text-lg"
              >
                Send Message
              </button>

              <p className="text-gray-500 text-sm text-center">
                We typically respond within 24 hours during business days.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section Placeholder */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Visit Our Office</h2>
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Agricultural Tech Park</h3>
              <p className="text-gray-600">Mumbai, Maharashtra, India</p>
              <p className="text-gray-500 text-sm mt-2">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;