import React from "react";

const AboutPage = () => {
  // 技能資料
  const skillCategories = [
    {
      title: "設計背景",
      color: "blue",
      icon: "M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z",
      skills: ["平面設計經驗", "活動文宣製作", "視覺設計規劃"],
      bgClass: "from-blue-50/80 to-blue-100/50",
      borderClass: "border-blue-200/40 hover:border-blue-300/60",
      iconBg: "from-blue-500 to-blue-600",
      textColor: "text-blue-900",
      itemColor: "text-blue-800",
    },
    {
      title: "持續學習技能",
      color: "slate",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      skills: ["React 基礎", "JavaScript 程式邏輯", "前端開發實作"],
      bgClass: "from-slate-50/80 to-slate-100/50",
      borderClass: "border-slate-200/40 hover:border-slate-300/60",
      iconBg: "from-slate-500 to-slate-600",
      textColor: "text-slate-900",
      itemColor: "text-slate-800",
    },
  ];

  // 學習歷程資料
  const learningSteps = [
    {
      period: "過去",
      title: "大學時期 - 系學會美編",
      description:
        "負責活動文宣設計，學習版面配置、色彩搭配與視覺傳達，培養了對美感的敏銳度和設計思維。",
      badgeClass: "bg-blue-100 text-blue-800",
      bgClass: "from-blue-50/50",
      iconBg: "from-blue-500 to-blue-600",
    },
    {
      period: "現在",
      title: "前端開發學習",
      description:
        "開始學習 React、JavaScript 等技術，並在小型專案中嘗試結合設計經驗與程式邏輯，逐步建立打造良好使用者體驗的能力。",
      badgeClass: "bg-slate-100 text-slate-800",
      bgClass: "from-slate-50/50",
      iconBg: "from-slate-500 to-slate-600",
    },
  ];

  // 未來規劃資料
  const futureGoals = [
    {
      type: "短期目標",
      description:
        "深化前端開發技能，成為能夠獨當一面的前端工程師，並持續學習新技術來提升開發品質。",
      badgeClass: "bg-blue-100 text-blue-800",
      bgClass: "from-blue-50/60 to-blue-100/30",
      borderClass: "border-blue-200/30 hover:border-blue-300/50",
      iconBg: "from-blue-500 to-blue-600",
    },
    {
      type: "中長期發展",
      description:
        "在前端領域站穩腳步後，希望能拓展到更多技術領域， 探索 AI 技術如何與前端開發結合，創造更智能的使用者體驗。",
      badgeClass: "bg-slate-100 text-slate-800",
      bgClass: "from-slate-50/60 to-slate-100/30",
      borderClass: "border-slate-200/30 hover:border-slate-300/50",
      iconBg: "from-slate-500 to-slate-600",
    },
    {
      type: "長期願景",
      description:
        "成為具備設計思維的跨領域技術專家， 結合前端、AI 與設計經驗，開發更有創意和實用性的產品。",
      badgeClass: "bg-gradient-to-r from-blue-100 to-slate-100 text-slate-800",
      bgClass: "from-blue-50/40 to-slate-50/40",
      borderClass: "border-blue-200/25 hover:border-blue-300/40",
      iconBg: "from-blue-600 to-slate-600",
    },
  ];

  // 通用圖標組件
  const Icon = ({ path, className = "w-4 h-4 text-white" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d={path} clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-slate-200/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-100/30 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 relative">
              關於我
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-slate-400 rounded-full"></div>
            </h1>
          </div>

          <article className="space-y-8">
            {/* 個人簡介 */}
            <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-300 group">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-slate-500 rounded-lg flex items-center justify-center">
                      <Icon path="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </div>
                    <h2 className="text-2xl font-semibold text-slate-800">
                      個人簡介
                    </h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4 pl-11">
                    我是一位兼具設計背景與開發熱情的學習者。
                    在大學時期累積了平面設計與活動文宣經驗，如今正把這些美感轉化為前端開發的實作能力。
                  </p>
                  <p className="text-slate-700 leading-relaxed pl-11">
                    從系學會美編工作開始，我發現自己對創作和技術都很有興趣，
                    於是開始學習前端開發，希望能結合視覺設計與程式邏輯。
                  </p>
                </div>

                <div className="grid gap-6">
                  {skillCategories.map((category) => (
                    <div
                      key={category.title}
                      className={`bg-gradient-to-br ${category.bgClass} rounded-2xl p-6 border ${category.borderClass} transition-all duration-300 group/card`}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div
                          className={`w-6 h-6 bg-gradient-to-br ${category.iconBg} rounded-lg flex items-center justify-center`}
                        >
                          <Icon
                            path={category.icon}
                            className="w-3 h-3 text-white"
                          />
                        </div>
                        <h3
                          className={`text-lg font-semibold ${category.textColor}`}
                        >
                          {category.title}
                        </h3>
                      </div>
                      <div className="space-y-3 ml-9">
                        {category.skills.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center group/item"
                          >
                            <div
                              className={`w-2 h-2 bg-gradient-to-r ${category.iconBg} rounded-full mr-3 group-hover/item:scale-125 transition-transform duration-200`}
                            ></div>
                            <span
                              className={`${category.itemColor} text-sm font-medium`}
                            >
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 學習歷程 */}
            <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-slate-500 rounded-lg flex items-center justify-center">
                  <Icon path="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">
                  學習歷程
                </h2>
              </div>
              <div className="space-y-8 ml-11 relative">
                {/* 時間線連接線 */}
                <div className="absolute left-1 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-400/60 via-slate-400/60 to-slate-400/60 rounded-full"></div>

                {learningSteps.map((step, index) => (
                  <div key={step.title} className="relative">
                    <div className="border-l-4 border-transparent pl-8 relative">
                      <div
                        className={`absolute -left-3 top-4 w-6 h-6 bg-gradient-to-br ${step.iconBg} rounded-full border-4 border-white shadow-lg z-10`}
                      ></div>
                      <div
                        className={`bg-gradient-to-r ${step.bgClass} to-transparent p-4 rounded-r-xl`}
                      >
                        <h3
                          className={`font-semibold ${
                            index === 0 ? "text-blue-900" : "text-slate-900"
                          } mb-2 flex items-center`}
                        >
                          <span
                            className={`${step.badgeClass} text-xs px-0 py-1 rounded-full mr-3`}
                          >
                            {step.period}
                          </span>
                          {step.title}
                        </h3>
                        <p className="text-slate-700">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 未來規劃 */}
            <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-slate-500 rounded-lg flex items-center justify-center">
                  <Icon path="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15v-3a1 1 0 011-1h2a1 1 0 011 1v3H8z" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">
                  未來規劃
                </h2>
              </div>
              <div className="grid gap-6 ml-11">
                {futureGoals.map((goal) => (
                  <div
                    key={goal.type}
                    className="group/goal hover:scale-[1.02] transition-all duration-300"
                  >
                    <div
                      className={`flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-r ${goal.bgClass} border ${goal.borderClass} transition-all duration-300`}
                    >
                      <div
                        className={`w-4 h-4 bg-gradient-to-br ${goal.iconBg} rounded-full mt-1 flex-shrink-0 group-hover/goal:scale-125 transition-transform duration-300`}
                      ></div>
                      <div>
                        <span
                          className={`inline-block ${goal.badgeClass} text-xs font-medium px-3 py-1 rounded-full mb-3`}
                        >
                          {goal.type}
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          {goal.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
