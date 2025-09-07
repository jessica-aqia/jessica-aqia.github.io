// 所有 import 都要放在檔案最上方
import { useState, useCallback } from "react";

// Google Sheets API 服務
// 注意：在正式專案中，建議將 API 金鑰移到環境變數以提高安全性
const API_KEY = "AIzaSyDg_fin-YLqFKRSTkWVJ-XVdPzM2TnIeo8";
const SPREADSHEET_ID = "1s3Blb8jtV0P0u1ayneTUTi96QfF0stAjdCduMmCzX60";
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
      let errorMessage = `Google Sheets API 錯誤 (${response.status})`;
      try {
        const errorText = await response.text();
        errorMessage += `: ${errorText}`;
      } catch {
        // 如果無法讀取錯誤訊息，使用預設訊息
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      return [];
    }

    // 第一行是標題行，從第二行開始是資料
    const rows = data.values.slice(1);

    // 將資料轉換為專案物件陣列
    const projects = rows
      .filter((row) => row.length >= 2 && row[0] && row[1]) // 確保有足夠欄位和基本資料
      .map((row) => {
        const dateStr = (row[5] || "").trim();
        const year = dateStr
          ? extractYearFromDate(dateStr)
          : new Date().getFullYear();

        return {
          id: String(row[0] || "").trim(),
          title: String(row[1] || "").trim(),
          description: String(row[2] || "").trim(),
          url: parseHtmlLinks(row[3] || ""), // 直接解析為連結陣列
          image: String(row[4] || "").trim(),
          created_date: dateStr,
          date: formatDate(dateStr), // 顯示用的格式化日期
          year: year, // 年份用於分組
          details: String(row[6] || "").trim(),
        };
      });

    projects.sort((a, b) => {
      // 如果沒有日期，放到最後
      if (!a.created_date && !b.created_date) return 0;
      if (!a.created_date) return 1;
      if (!b.created_date) return -1;

      // 將日期字串轉換為可比較的日期物件
      const dateA = new Date(a.created_date);
      const dateB = new Date(b.created_date);

      // 最新的日期排在前面（降冪排列）
      return dateB - dateA;
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects data:", error);
    throw error;
  }
};

/**
 * 從日期字串中提取年份
 * @param {string} dateString - 日期字串
 * @returns {number} 年份
 */
const extractYearFromDate = (dateString) => {
  if (!dateString) return new Date().getFullYear();

  // 處理各種日期格式
  if (dateString.includes("/")) {
    const parts = dateString.split("/");
    // 假設格式為 MM/DD/YYYY 或 DD/MM/YYYY
    const year = parts[2] || parts[0];
    const yearNum = parseInt(year, 10);
    return yearNum && yearNum > 1900 ? yearNum : new Date().getFullYear();
  } else if (dateString.includes("-")) {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? new Date().getFullYear()
      : date.getFullYear();
  } else {
    // 嘗試直接解析為年份
    const yearNum = parseInt(dateString, 10);
    return yearNum && yearNum > 1900 ? yearNum : new Date().getFullYear();
  }
};

/**
 * 解析 HTML 連結標籤為連結物件陣列
 * @param {string} htmlString - 包含 HTML 連結的字串
 * @returns {Array} 連結物件陣列
 */
export const parseHtmlLinks = (htmlString) => {
  if (!htmlString || typeof htmlString !== "string") return [];

  // 更嚴謹的正規表達式，處理更多邊界情況
  const linkRegex = /<a\s+[^>]*href\s*=\s*["']([^"']*?)["'][^>]*?>(.*?)<\/a>/gi;
  const links = [];
  let match;

  while ((match = linkRegex.exec(htmlString)) !== null) {
    const url = match[1].trim();
    const text = match[2].replace(/<[^>]*>/g, "").trim(); // 移除內部 HTML 標籤

    if (url && text) {
      links.push({
        url: url,
        text: text,
      });
    }
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

  try {
    if (dateString.includes("/")) {
      return dateString; // 已經是 MM/DD/YYYY 格式
    } else if (dateString.includes("-")) {
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? dateString
        : date.toLocaleDateString("zh-TW");
    }
    return dateString;
  } catch {
    return dateString;
  }
};

/**
 * 美化 HTML 連結：自動加上 Tailwind 樣式
 * @param {string} html - 來源 HTML 字串
 * @returns {string} 已加上樣式的 HTML 字串
 */
export const beautifyAnchorsHtml = (html) => {
  if (!html || typeof html !== "string") return html || "";

  const buttonClasses =
    "inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-medium";

  return html.replace(/<a\b([^>]*)>/gi, (match, attrs) => {
    const hasClass = /\bclass\s*=\s*"[^"]*"/i.test(attrs);
    if (hasClass) {
      return match.replace(
        /class\s*=\s*"([^"]*)"/i,
        (_m, existing) => `class="${existing} ${buttonClasses}"`
      );
    }
    return `<a class="${buttonClasses}"${attrs}>`;
  });
};

/**
 * React Hook：Google Sheets 專案資料管理
 * @returns {Object} Hook 回傳物件
 */
export const useGoogleSheetsProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProjectsFromGoogleSheets();
      setProjects(data);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.message || "載入專案資料時發生錯誤";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    projects,
    loading,
    error,
    loadProjects,
    clearError,
    // 工具函式
    parseLinks: parseHtmlLinks,
    formatDate: formatDate,
    beautifyAnchorsHtml,
  };
};
