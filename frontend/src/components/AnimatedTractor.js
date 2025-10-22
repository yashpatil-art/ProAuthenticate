import React from 'react';
import Lottie from 'lottie-react';
import tractorAnimation from '../assets/tractor.json'; // Adjust path based on where you place the JSON file
import './AnimatedTractor.css'; 

const AnimatedTractor = () => {
  return (
    <div className="absolute -top-20 left-0 right-0 z-10 pointer-events-none overflow-hidden h-40">
      <div className="tractor-move-animation">
        <Lottie 
          animationData={tractorAnimation}
          loop={true}
          autoplay={true}
          className="w-40 h-40" // Adjust size as needed
        />
      </div>
    </div>
  );
};

export default AnimatedTractor;