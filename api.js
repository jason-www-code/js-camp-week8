// ========================================
// API 請求函式
// ========================================

const axios = require("axios");
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require("./config");

// ========== 客戶端 API ==========

const clientUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}`;
/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  // 請實作此函式
  // 回傳 response..products

  const { data } = await axios.get(`${clientUrl}/products`);

  return data.products;
}
/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  const { data } = await axios.get(`${clientUrl}/carts`);

  const { carts, total, finalTotal } = data;

  return { carts, total, finalTotal };
}
/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  const body = {
    data: {
      productId,
      quantity,
    },
  };

  const { data } = await axios.post(`${clientUrl}/carts`, body);

  return data;
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  const body = {
    data: {
      id: cartId,
      quantity,
    },
  };

  const { data } = await axios.patch(`${clientUrl}/carts`, body);

  return data;
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  const { data } = await axios.delete(`${clientUrl}/carts/${cartId}`);

  return data;
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  const { data } = await axios.delete(`${clientUrl}/carts`);

  return data;
}
/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  const body = {
    data: {
      user: userInfo,
    },
  };

  const { data } = await axios.post(`${clientUrl}/orders`, body);

  return data;
}

// ========== 管理員 API ==========
const admintUrl = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}`;
/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */
const config = {
  headers: {
    authorization: ADMIN_TOKEN,
  },
};

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  const { data } = await axios.get(`${admintUrl}/orders`, config);
  const { orders } = data;
  return orders;
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  const body = {
    data: {
      id: orderId,
      paid: isPaid,
    },
  };
  const { data } = await axios.put(`${admintUrl}/orders`, body, config);

  return data;
}
/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  const { data } = await axios.delete(`${admintUrl}/orders/${orderId}`, config);

  return data;
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
};
