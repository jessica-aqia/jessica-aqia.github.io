import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 動態背景 */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(100, 116, 139, 0.3) 0%, transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">跨領域學習者</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-600 mb-8 animate-slide-up">
            從美編設計到程式開發的多元探索
          </p>
          <div className="flex justify-center space-x-4 animate-slide-up">
            <Link
              to="/projects"
              className="glass-effect px-8 py-3 rounded-full text-primary-700 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
            >
              查看作品
            </Link>
            <Link
              to="/contact"
              className="morandi-gradient px-8 py-3 rounded-full text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              聯絡資料
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
