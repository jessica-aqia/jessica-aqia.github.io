import React from 'react';
import Hero from '../components/Hero';

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* 浮動裝飾元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300/20 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-100/40 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <Hero />
    </div>
  );
};

export default HomePage;