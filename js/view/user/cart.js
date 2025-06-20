const showCartPage = () => {
  let yourCart = cartStore.getProductCart(account.id);
  let html = `<section class="product-list">
  <section class="cart-items" id="cart-items">`;

  yourCart.listProductCart.map((item) => {
    html += `
    <div class="cart-item" >
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>Price: $${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <p><strong>Subtotal: $${item.price * item.quantity}</strong></p>
        </div>
        <button class="remove-btn" onclick="removeProductInCart('${item.id}')">❌</button>
    </div>`;
  });
  html += `
  </section>
  <!-- Tổng kết đơn hàng -->
    <aside class="cart-summary">
      <h2>Summary</h2>
      <p>Total Quantity: <strong id="total-qty">${yourCart.totalQuantity}</strong></p>
      <p>Total Amount: <strong id="total-price">$${yourCart.totalAmount}</strong></p>
      <button ${
        yourCart.listProductCart.length == 0 && "disabled"
      } class="checkout-btn" onclick="payment()">Checkout</button>
    </aside>
    </section>`;
  document.getElementById("main_content").innerHTML = html;
};

const removeProductInCart = (id) => {
  cartStore.deleteProduct(account.id, id);
  showCartPage();
  updateNavMenu();
};

const payment = () => {
  let yourCart = cartStore.getProductCart(account.id);
  let id = randomId(999);
  let date = new Date();
  let formatted = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
  let order = new Order(
    id,
    account.id,
    yourCart.listProductCart,
    yourCart.totalQuantity,
    yourCart.totalAmount,
    formatted
  );
  orderStore.createOrder(order);
  cartStore.clearCart(account.id);
  updateNavMenu();
  idBill = id;
  showNotifySuccess(showOrderPay, "Checkout success");
};
