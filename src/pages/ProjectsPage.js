import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getProjects } from "../services/googleSheetsAPI";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 裝飾元素資料
  const decorations = [
    {
      className:
        "top-16 sm:top-24 right-4 sm:right-16 w-16 sm:w-24 h-16 sm:h-24",
      color: "bg-blue-200/20",
      delay: "",
    },
    {
      className: "top-40 sm:top-60 left-4 sm:left-12 w-10 sm:w-16 h-10 sm:h-16",
      color: "bg-slate-200/25",
      delay: "1s",
    },
    {
      className: "bottom-20 sm:bottom-32 right-1/4 w-12 sm:w-20 h-12 sm:h-20",
      color: "bg-blue-300/15",
      delay: "2s",
    },
  ];

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects();
        console.log("從資料庫取得的專案:", data);
        setProjects(data);
      } catch (error) {
        console.error("載入專案失敗:", error);
        setError("載入專案失敗，請檢查後端是否運行");
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showDetails) closeDetails();
    };
    if (showDetails) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [showDetails]);

  const projectsByYear = projects.reduce((acc, project) => {
    if (!acc[project.year]) acc[project.year] = [];
    acc[project.year].push(project);
    return acc;
  }, {});

  const years = Object.keys(projectsByYear).sort((a, b) => b - a);

  const handleTimelineClick = (project) => {
    setSelectedProject(project);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedProject(null);
  };

  // 共用的容器樣式
  const containerClass =
    "pt-16 sm:pt-20 min-h-screen bg-gradient-to-br from-blue-50/70 via-slate-50/60 to-blue-100/80 relative";
  const cardClass =
    "bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg max-w-sm w-full text-center";

  // 載入中畫面
  if (loading) {
    return (
      <div
        className={`${containerClass} flex items-center justify-center px-4`}
      >
        {decorations.slice(0, 2).map((dec, i) => (
          <div
            key={i}
            className={`absolute ${dec.className} ${dec.color} rounded-full blur-lg animate-pulse`}
            style={{ animationDelay: dec.delay }}
          />
        ))}
        <div className={cardClass + " p-6 sm:p-8"}>
          <div className="text-xl sm:text-2xl text-slate-700 mb-4 sm:mb-6 font-medium">
            載入專案中...
          </div>
          <div className="w-8 sm:w-10 h-8 sm:h-10 border-4 border-blue-200/60 border-t-blue-500/80 rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // 錯誤畫面
  if (error) {
    return (
      <div
        className={`${containerClass} flex items-center justify-center px-4`}
      >
        <div className="absolute top-20 sm:top-32 right-4 sm:right-20 w-12 sm:w-20 h-12 sm:h-20 bg-red-200/20 rounded-full blur-lg" />
        <div className="absolute bottom-20 sm:bottom-40 left-4 sm:left-20 w-10 sm:w-16 h-10 sm:h-16 bg-slate-200/25 rounded-full blur-md" />
        <div className={cardClass + " p-6 sm:p-8"}>
          <div className="text-lg sm:text-2xl text-red-600 mb-4 sm:mb-6 font-medium break-words">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500/80 to-slate-500/80 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-blue-600/80 hover:to-slate-600/80 transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            重新載入
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerClass} overflow-hidden`}>
      {/* 裝飾元素 */}
      {decorations.map((dec, i) => (
        <div
          key={i}
          className={`absolute ${dec.className} ${dec.color} rounded-full blur-xl animate-pulse`}
          style={{ animationDelay: dec.delay }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        {/* 標題 */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-3 sm:mb-4 px-2">
            作品集時間線
          </h1>
          <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-blue-400/60 to-slate-400/60 mx-auto rounded-full mb-3 sm:mb-4" />
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            探索我的創作歷程，每個專案都是成長的足跡
          </p>
        </div>

        {/* 時間線 */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 h-full w-0.5 sm:w-1 bg-gradient-to-b from-blue-400/60 via-slate-400/60 to-blue-400/60 rounded-full" />

          {years.map((year) => (
            <div key={year} className="mb-12 sm:mb-16">
              {/* 年份標籤 */}
              <div className="flex justify-center mb-8 sm:mb-10 relative px-4">
                <div className="bg-gradient-to-r from-blue-500/80 to-slate-500/80 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20">
                  {year}
                  <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-blue-500/80 to-slate-500/80 rotate-45" />
                </div>
              </div>

              {/* 專案列表 */}
              {projectsByYear[year].map((project, projectIndex) => {
                const isLeft = projectIndex % 2 === 0;
                return (
                  <div
                    key={project.id}
                    className={`relative flex items-center mb-8 sm:mb-12 group pl-16 sm:pl-0 ${
                      isLeft ? "sm:justify-start" : "sm:justify-end"
                    }`}
                  >
                    {/* 時間點 */}
                    <div
                      className="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-blue-400/80 to-slate-400/80 rounded-full border-2 sm:border-4 border-white shadow-lg sm:shadow-xl cursor-pointer hover:scale-110 sm:hover:scale-125 transition-all duration-300 z-10 hover:shadow-2xl group-hover:animate-pulse"
                      onClick={() => handleTimelineClick(project)}
                    >
                      <div className="absolute inset-0.5 sm:inset-1 bg-white/30 rounded-full" />
                    </div>

                    {/* 連接線 */}
                    <div
                      className={`absolute top-1/2 w-8 sm:w-16 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 left-10 from-blue-300/50 to-transparent ${
                        isLeft
                          ? "sm:left-1/2 sm:ml-4 sm:from-blue-300/50 sm:to-transparent"
                          : "sm:right-1/2 sm:mr-4 sm:from-transparent sm:to-blue-300/50"
                      }`}
                    />

                    {/* 專案卡片 */}
                    <div
                      className={`w-full sm:w-5/12 sm:max-w-md ${
                        isLeft ? "sm:ml-0 sm:pl-8" : "sm:mr-0 sm:pr-8"
                      }`}
                    >
                      <div
                        className={`bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1 sm:hover:-translate-y-2 border border-blue-100/30 group-hover:border-blue-200/50 ${
                          isLeft ? "sm:hover:rotate-1" : "sm:hover:-rotate-1"
                        }`}
                        onClick={() => handleTimelineClick(project)}
                      >
                        {project.image && (
                          <div className="w-full h-32 sm:h-36 mb-4 sm:mb-5 rounded-lg sm:rounded-xl overflow-hidden relative group">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => (e.target.style.display = "none")}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 break-words">
                            {project.title}
                          </h3>
                          <span className="text-xs sm:text-sm text-blue-600/80 font-medium bg-blue-50/80 px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto whitespace-nowrap">
                            {project.date}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-5 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.url?.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-100/80 to-slate-100/80 text-blue-700 rounded-full text-xs sm:text-sm font-medium hover:from-blue-200/80 hover:to-slate-200/80 transition-all duration-300 hover:scale-105 border border-blue-200/30"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {link.text}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showDetails &&
        selectedProject &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999999] flex items-center justify-center p-4 animate-fadeIn"
            onClick={closeDetails}
          >
            <div
              className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-[min(90vw,48rem)] w-full max-h-[90vh] shadow-2xl border border-white/50 overflow-hidden animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-y-auto max-h-[90vh] p-6 sm:p-10">
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <div className="flex-1 pr-4">
                    <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-2 sm:mb-3 break-words">
                      {selectedProject.title}
                    </h2>
                    <p className="text-blue-600 font-medium bg-blue-50/80 px-3 sm:px-4 py-1 sm:py-2 rounded-full inline-block text-sm sm:text-base">
                      {selectedProject.date}
                    </p>
                  </div>
                  <button
                    onClick={closeDetails}
                    className="text-slate-400 text-2xl font-bold w-12 h-12 rounded-full border-none bg-transparent cursor-pointer flex items-center justify-center transition-all duration-300 hover:text-slate-600 hover:bg-slate-100/50 hover:scale-110 flex-shrink-0"
                  >
                    ×
                  </button>
                </div>

                {selectedProject.image ? (
                  <div className="relative mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden group">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-48 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                ) : (
                  <div className="h-48 sm:h-72 bg-gradient-to-br from-blue-100/60 to-slate-100/60 rounded-xl sm:rounded-2xl flex items-center justify-center w-full border-2 border-dashed border-blue-200/50 mb-6 sm:mb-8">
                    <span className="text-blue-400/80 text-base sm:text-lg">
                      專案圖片
                    </span>
                  </div>
                )}

                <p className="text-slate-700 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                  {selectedProject.details}
                </p>

                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-5 flex items-center">
                    <span className="w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-r from-blue-400/60 to-slate-400/60 rounded-full mr-2 sm:mr-3" />
                    相關連結
                  </h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {selectedProject.url?.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500/80 to-slate-500/80 text-white rounded-xl sm:rounded-2xl font-medium hover:from-blue-600/80 hover:to-slate-600/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;
