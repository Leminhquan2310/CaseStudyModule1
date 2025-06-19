const showOrderPay = () => {
  if (!idBill) {
    window.location.href = "index.html";
  }

  let order = orderStore.getOrderById(idBill);
  let html = `<div class="invoice">
    <h1>🧾 Bill</h1>
    <div class="store-info">
      <p><strong>Store:</strong> Shop Thời Trang</p>
      <p><strong>Date:</strong> <span id="invoice-date">${order.createdAt}</span></p>
    </div>
    <div class="customer-info">
      <p><strong>Customer:</strong> ${account.fullname}</p>
    </div>
    <table class="product-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Unit price ($)</th>
          <th>into money ($)</th>
        </tr>
      </thead>
      <tbody id="product-list">
        <!-- JS sẽ render -->
        ${order.products
          .map((item, index) => {
            return `<tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.quantity * item.price}</td>
          </tr>`;
          })
          .join("")}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4"><strong>Total Amount</strong></td>
          <td id="total-amount"><strong>$${order.totalAmount}</strong></td>
        </tr>
      </tfoot>
    </table>

    <p class="thank-you">Thank you for your purchase!</p>
    <button class="btn_back_home" onclick="backHome()">Back to Home</button>
  </div>`;
  document.getElementById("main_content").innerHTML = html;
};

const backHome = () => {
  window.location.href = "index.html";
};
