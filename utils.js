// ========================================
// 工具函式
// ========================================

const dayjs = require("dayjs");

/**
 * 計算產品折扣率
 * @param {Object} product - 產品物件
 * @returns {string} - 例如 '8折'
 */
function getDiscountRate(product) {
  const { origin_price, price } = product;
  const rate = Math.round((price / origin_price) * 10);

  return `${rate}折`;
}

/**
 * 取得所有產品分類（不重複）
 * @param {Array} products - 產品陣列
 * @returns {Array} - 分類陣列
 */
function getAllCategories(products) {
  const categories = products.map((product) => product.category);
  const categorySet = new Set(categories);

  return [...categorySet];
}

/**
 * 格式化日期
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - 格式 'YYYY/MM/DD HH:mm'，例如 '2024/01/01 08:00'
 */
function formatDate(timestamp) {
  const unixTime = dayjs.unix(timestamp);
  const timePattern = "YYYY/MM/DD HH:mm";

  return unixTime.format(timePattern);
}

/**
 * 計算距今天數
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - 例如 '3 天前'
 */
function getDaysAgo(timestamp) {
  // 請實作此函式
  // 提示：
  // 1. 用 dayjs() 取得今天
  // 2. 用 dayjs.unix(timestamp) 取得日期
  // 3. 用 .diff() 計算天數差異

  const today = dayjs();
  const compareTime = dayjs.unix(timestamp);
  const unit = "day";
  const timeGap = today.diff(compareTime, unit);

  return timeGap ? `${timeGap}天前` : "今天";
}

/**
 * 驗證訂單使用者資料
 * @param {Object} data - 使用者資料
 * @returns {Object} - { isValid: boolean, errors: string[] }
 *
 * 驗證規則：
 * - name: 不可為空
 * - tel: 必須是 09 開頭的 10 位數字
 * - email: 必須包含 @ 符號
 * - address: 不可為空
 * - payment: 必須是 'ATM', 'Credit Card', 'Apple Pay' 其中之一
 */
function validateOrderUser(data) {
  const { name, tel, email, address, payment } = data;
  const errors = [];

  const phoneRule = /^09\d{8}$/;
  const emailRule = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const paymentRule = ["ATM", "Credit Card", "Apple Pay"];

  const isNameInvalid = name.trim() === "";
  const isPhoneInvalid = !phoneRule.test(tel);
  const isEmailInvalid = !emailRule.test(email);
  const isAddressInvalid = address.trim() === "";
  const isPaymentInvalid = !paymentRule.includes(payment);

  if (isNameInvalid) errors.push("name 不可為空");
  if (isPhoneInvalid) errors.push("tel 必須是 09 開頭的 10 位數字");
  if (isEmailInvalid) errors.push("email 必須包含 @ 符號");
  if (isAddressInvalid) errors.push("address 不可為空");
  if (isPaymentInvalid)
    errors.push("payment 必須是 'ATM', 'Credit Card', 'Apple Pay' 其中之一");

  return { isValid: errors.length === 0, errors };
}

/**
 * 驗證購物車數量
 * @param {number} quantity - 數量
 * @returns {Object} - { isValid: boolean, error?: string }
 *
 * 驗證規則：
 * - 必須是正整數
 * - 不可小於 1
 * - 不可大於 99
 */
function validateCartQuantity(quantity) {
  const isPositiveInteger = Number.isInteger(quantity);
  const minQuantity = 1;
  const maxQuantity = 99;

  const errors = [];

  if (!isPositiveInteger) errors.push("必須是正整數");
  if (quantity < minQuantity) errors.push(`不可小於 ${minQuantity}`);
  if (quantity > maxQuantity) errors.push(`不可大於 ${maxQuantity}`);

  if (errors.length > 0) return { isValid: false, error: errors.join("，") };

  return { isValid: true };
}

/**
 * 格式化金額
 * @param {number} amount - 金額
 * @returns {string} - 格式化後的金額
 *
 * 格式化規則：
 * - 加上 "NT$ " 前綴
 * - 數字需要千分位逗號分隔（例如：1000 → 1,000）
 * - 使用台灣格式（zh-TW）
 *
 * 範例：
 * formatCurrency(1000) → "NT$ 1,000"
 * formatCurrency(1234567) → "NT$ 1,234,567"
 *
 */
function formatCurrency(amount) {
  const prefix = "NT$ ";
  return prefix + amount.toLocaleString("zh-TW");
}

module.exports = {
  getDiscountRate,
  getAllCategories,
  formatDate,
  getDaysAgo,
  validateOrderUser,
  validateCartQuantity,
  formatCurrency,
};
