import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";

console.log("Header:", Header);
console.log("HomePage:", HomePage);
console.log("AboutPage:", AboutPage);
console.log("ProjectsPage:", ProjectsPage);
console.log("ContactPage:", ContactPage);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* 全域導航欄 */}
        <Header />

        {/* 主要內容區域 */}
        <main className="relative">
          {/* 全域背景裝飾元素 */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
            <div
              className="absolute top-40 right-20 w-24 h-24 bg-blue-300/15 rounded-full blur-lg animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-100/25 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/3 w-20 h-20 bg-blue-400/10 rounded-full blur-md animate-pulse"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>

          {/* 路由內容 */}
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* 404 頁面 */}
              <Route
                path="*"
                element={
                  <div className="pt-20 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-blue-300 mb-4">
                        404
                      </h1>
                      <p className="text-xl text-blue-600 mb-8">頁面未找到</p>
                      <a
                        href="/"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                      >
                        返回首頁
                      </a>
                    </div>
                  </div>
                }
              />
            </Routes>
          </div>
        </main>

        {/* 頁面載入指示器 */}
        {!isLoaded && (
          <div className="fixed inset-0 bg-blue-50 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-blue-600">載入中...</p>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
