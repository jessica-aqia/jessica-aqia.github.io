import React from "react";

const ContactPage = () => {
  const contactItems = [
    {
      icon: "📧",
      label: "電子郵件",
      value: "Service@gmail.com",
    },
    {
      icon: "📱",
      label: "電話",
      value: "0912-345-678",
    },
    {
      icon: "📍",
      label: "地址",
      value: "台中市西區",
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50/70 via-slate-50/60 to-blue-100/80 relative">
      {/* 簡化的裝飾元素 - 只保留兩個 */}
      <div className="absolute top-32 right-20 w-24 h-24 bg-blue-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-slate-200/25 rounded-full blur-lg"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* 簡化的標題區域 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              聯絡我
            </h1>
            <div className="w-16 h-0.5 bg-blue-400/60 mx-auto rounded-full mb-3"></div>
          </div>

          {/* 簡化的聯絡資訊卡片 */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100/30 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-slate-800 mb-8 text-center">
              聯絡資訊
            </h2>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* 左側：聯絡資訊 */}
              <div className="space-y-6">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start group hover:transform hover:translate-x-1 transition-all duration-200"
                  >
                    <div className="w-12 h-12 bg-blue-100/60 rounded-xl flex items-center justify-center mr-5 mt-1 flex-shrink-0 group-hover:bg-blue-100/80 transition-all duration-200">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-800 font-medium mb-1">
                        {item.label}
                      </p>
                      <p className="text-blue-700">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 右側：個人照片 - 簡化設計 */}
              <div className="flex justify-center">
                <div className="w-56 h-72 rounded-2xl overflow-hidden shadow-lg border border-blue-100/40 hover:transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                  <img
                    src={`${process.env.PUBLIC_URL}/photo.jpg`}
                    alt="個人照片"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='224' height='288' viewBox='0 0 24 24' fill='%23475569'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
