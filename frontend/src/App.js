import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import FarmerLogin from './pages/FarmerLogin';
import CustomerLogin from './pages/CustomerLogin';
import AdminDashboard from './pages/AdminDashboard';
import FarmerDashboard from './pages/FarmerDashboard';
import AdminLogin from './pages/AdminLogin';
import Login from './components/login';
import CustomerDashboard from './pages/CustomerDashboard'; // ← ADD THIS IMPORT
import './styles/globals.css';
import Sustainability from './pages/Sustainability';
import News from './pages/News';
// In your App.js, add these routes:
import AdminAIRatingDisplay from './components/AdminAIRatingDisplay';
import CustomerAIRatedProducts from './components/CustomerAIRatedProducts';


// Inside your Routes:



// React Router future flags to suppress warnings
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <Router {...routerConfig}>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productSlug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/farmer-login" element={<FarmerLogin />} />
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} /> {/* ← ADD THIS ROUTE */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/news" element={<News />} />
            {/* Add a catch-all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
            <Route path="/admin/ai-ratings" element={<AdminAIRatingDisplay />} />
            <Route path="/products" element={<CustomerAIRatedProducts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Simple 404 component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-4">Page not found</p>
      <a href="/" className="text-blue-600 hover:text-blue-800 underline">
        Return to Home
      </a>
    </div>
  </div>
);

export default App;