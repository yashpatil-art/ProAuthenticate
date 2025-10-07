import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import FarmerLogin from './pages/FarmerLogin';
import CustomerLogin from './pages/CustomerLogin';
import AdminDashboard from './pages/AdminDashboard';
import FarmerDashboard from './pages/FarmerDashboard';
import AdminLogin from './pages/AdminLogin';
import './styles/globals.css';

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
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/farmer-login" element={<FarmerLogin />} />
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;