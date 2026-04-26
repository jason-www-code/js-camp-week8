// ========================================
// 訂單服務
// ========================================

const {
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../api");
const {
  validateOrderUser,
  formatDate,
  getDaysAgo,
  formatCurrency,
} = require("../utils");

/**
 * 建立新訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function placeOrder(userInfo) {
  // 請實作此函式
  // 提示：先用 utils validateOrderUser() 驗證使用者資料，驗證失敗時回傳 { success: false, errors: [...] }
  // 驗證通過後，呼叫 createOrder() 建立訂單
  // 回傳格式：{ success: true, data: ... } / { success: false, errors: [...] }

  const { isValid, errors } = validateOrderUser(userInfo);

  if (!isValid) return { success: false, errors };

  try {
    const response = await createOrder(userInfo);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return { success: false, errors: error };
  }
}

/**
 * 取得所有訂單
 * @returns {Promise<Array>}
 */
async function getOrders() {
  // 請實作此函式
  // 提示：呼叫 fetchOrders() 取得訂單陣列並回傳
  return await fetchOrders();
}

/**
 * 取得未付款訂單
 * @returns {Promise<Array>}
 */
async function getUnpaidOrders() {
  // 請實作此函式
  // 提示：呼叫 fetchOrders() 後，篩選出 paid 為 false 的訂單
  const response = await fetchOrders();

  return response.filter((item) => !item.paid);
}

/**
 * 取得已付款訂單
 * @returns {Promise<Array>}
 */
async function getPaidOrders() {
  // 請實作此函式
  // 提示：呼叫 fetchOrders() 後，篩選出 paid 為 true 的訂單
  const response = await fetchOrders();

  return response.filter((item) => item.paid);
}

/**
 * 更新訂單付款狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updatePaymentStatus(orderId, isPaid) {
  // 請實作此函式
  // 提示：呼叫 updateOrderStatus()
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  try {
    const response = await updateOrderStatus(orderId, isPaid);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function removeOrder(orderId) {
  // 請實作此函式
  // 提示：呼叫 deleteOrder()
  // 回傳格式：{ success: true, data: ... } / { success: false, error: ... }
  try {
    const response = await deleteOrder(orderId);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return { success: false,  error };
  }
}

/**
 * 格式化訂單資訊
 * @param {Object} order - 訂單物件
 * @returns {Object} - 格式化後的訂單
 *
 * 回傳物件包含以下欄位：
 * - id: 訂單 ID
 * - user: 使用者資料
 * - products: 商品陣列
 * - total: 總金額（原始數字）
 * - totalFormatted: 格式化金額，使用 utils formatCurrency()
 * - paid: 付款狀態（布林值）
 * - paidText: 付款狀態文字，true → '已付款'，false → '未付款'
 * - createdAt: 格式化後的建立時間，使用 utils
 * - daysAgo: 距離今天為幾天前，使用 utils getDaysAgo()
 */
function formatOrder(order) {
  const { id, user, products, total, paid, createdAt } = order;

  const totalFormatted = formatCurrency(paid);
  const paidText = paid ? "已付款" : "未付款";
  const createdAtFormatted = formatDate(createdAt);
  const daysAgo = getDaysAgo(createdAt);

  return {
    id,
    user,
    products,
    total,
    totalFormatted,
    paid,
    paidText,
    createdAt: createdAtFormatted,
    daysAgo,
  };
}

/**
 * 顯示訂單列表
 * @param {Array} orders - 訂單陣列
 */
function displayOrders(orders) {
  // 請實作此函式
  // 提示：先判斷訂單陣列是否為空，若空則輸出「沒有訂單」
  // 使用 formatOrder() 格式化每筆訂單後再輸出
  //
  // 預期輸出格式：
  // 訂單列表：
  // ========================================
  // 訂單 1
  // ----------------------------------------
  // 訂單編號：xxx
  // 顧客姓名：王小明
  // 聯絡電話：0912345678
  // 寄送地址：台北市...
  // 付款方式：Credit Card
  // 訂單金額：NT$ 1,000
  // 付款狀態：已付款
  // 建立時間：2024-01-01 (3 天前)
  // ----------------------------------------
  // 商品明細：
  //   - 產品名稱 x 2（產品數量）
  // ========================================
  if (!orders?.length) console.log("沒有訂單");

  const formattedOrders = orders.map(formatOrder);

  formattedOrders.forEach((order, index) => {
    const {
      id,
      user,
      products,
      total,
      totalFormatted,
      paid,
      paidText,
      createdAt,
      daysAgo,
    } = order;

    // 條列訂單的商品明細
    const purchaseProducts = products
      .map((product) => `- ${product.title} x ${product.quantity} \n`)
      .join("");

    console.log(`訂單列表：`);
    console.log(`========================================`);
    console.log(`訂單 ${index + 1}`);
    console.log(`----------------------------------------`);
    console.log(`訂單編號：${id}`);
    console.log(`顧客姓名：${user.name}`);
    console.log(`聯絡電話：${user.tel}`);
    console.log(`寄送地址：${user.address}`);
    console.log(`付款方式：${user.payment}`);
    console.log(`訂單金額：${total}`);
    console.log(`付款狀態：${paidText}`);
    console.log(`建立時間：${createdAt}(${daysAgo})`);
    console.log(`----------------------------------------`);
    console.log(`商品明細：`);
    console.log(`${purchaseProducts}`);
    console.log(`========================================`);
  });
}

module.exports = {
  placeOrder,
  getOrders,
  getUnpaidOrders,
  getPaidOrders,
  updatePaymentStatus,
  removeOrder,
  formatOrder,
  displayOrders,
};
