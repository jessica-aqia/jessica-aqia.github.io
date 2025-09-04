// Google Sheets API 服務
const API_KEY = "AIzaSyA3nIXUavR2SCSdQIsj4tXgTbh7SEiusDs";
const SPREADSHEET_ID = "1HQEfsZA0utuOww8mKioWKFVJnnAeGLfZNnhvdhJJpZE";
const RANGE = "A:G";

/**
 * 從 Google Sheets 抓取專案資料
 * @returns {Promise<Array>} 專案資料陣列
 */
export const fetchProjectsFromGoogleSheets = async () => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      return [];
    }

    // 第一行是標題行，從第二行開始是資料
    const rows = data.values.slice(1);

    // 將資料轉換為專案物件陣列
    const projects = rows
      .filter((row) => row[0] && row[1]) // 確保有 id 和 title
      .map((row) => ({
        id: row[0] || "",
        title: row[1] || "",
        description: row[2] || "",
        url: row[3] || "",
        image: row[4] || "",
        created_date: row[5] || "",
        details: row[6] || "",
      }));

    return projects;
  } catch (error) {
    console.error("Error fetching projects data:", error);
    throw error;
  }
};

/**
 * 解析 HTML 連結標籤為連結物件陣列
 * @param {string} htmlString - 包含 HTML 連結的字串
 * @returns {Array} 連結物件陣列
 */
export const parseHtmlLinks = (htmlString) => {
  if (!htmlString) return [];

  const linkRegex = /<a href="([^"]*)"[^>]*>([^<]*)<\/a>/g;
  const links = [];
  let match;

  while ((match = linkRegex.exec(htmlString)) !== null) {
    links.push({
      url: match[1],
      text: match[2],
    });
  }

  return links;
};

/**
 * 格式化日期字串
 * @param {string} dateString - 日期字串
 * @returns {string} 格式化後的日期
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";

  if (dateString.includes("/")) {
    return dateString;
  } else if (dateString.includes("-")) {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-TW");
  }

  return dateString;
};

/**
 * React Hook 風格的 Google Sheets API
 * @returns {Object} API 方法物件
 */
export const useGoogleSheetsProjects = () => {
  return {
    async loadProjects() {
      try {
        const projects = await fetchProjectsFromGoogleSheets();
        return { data: projects, error: null };
      } catch (error) {
        return { data: [], error: error.message };
      }
    },
    parseLinks: parseHtmlLinks,
    formatDate: formatDate,
  };
};

/**
 * 美化 Sheets 提供的 <a> 連結：自動加上 Tailwind 樣式
 * 僅處理樣式，不更動 href 或 target/rel
 * @param {string} html - 來源 HTML 字串
 * @returns {string} 已加上樣式的 HTML 字串
 */
export const beautifyAnchorsHtml = (html) => {
  if (!html || typeof html !== "string") return html || "";

  const buttonClasses =
    "inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-medium";

  // 將 <a ...> 注入/附加 class
  const withClasses = html.replace(/<a\b([^>]*)>/gi, (match, attrs) => {
    const hasClass = /\bclass\s*=\s*"[^"]*"/i.test(attrs);
    if (hasClass) {
      // 在現有 class 後面附加我們的樣式
      return match.replace(
        /class\s*=\s*"([^"]*)"/i,
        (_m, existing) => `class="${existing} ${buttonClasses}"`
      );
    }
    // 沒有 class，插入 class 屬性
    return `<a class="${buttonClasses}"${attrs}>`;
  });

  return withClasses;
};
