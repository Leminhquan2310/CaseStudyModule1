let productStore = new ProductService("listProduct");
let accountStore = new AccountService("listAccount");
let cartStore = new CartService("listCart");
let orderStore = new OrderService("listOrder");
let idBill = "";

const showHomePage = () => {
  let list = productStore.readProduct();
  let html = `<section class="product-list">`;
  list.map((item) => {
    html += `<div class="product-card">
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p class="price">${item.price}$</p>
        <p>Category: <strong>${productStore.getCategoryName(item.category_id)}</strong></p>
        <p>Brand: <strong>${productStore.getBrandName(item.brand_id)}</strong></p>
        <button class="btn_add_cart" onclick="add_to_cart('${item.id}')">Add to cart</button>
      </div>`;
  });
  html += `</section>`;
  document.getElementById("main_content").innerHTML = html;
};

const add_to_cart = (id) => {
  cartStore.updateAddProduct(account.id, id);
  updateNavMenu();
};

const updateNavMenu = () => {
  account = accountStore.getAccount(auth.id);
  if (account.role === 1) {
    let cart = cartStore.getCartByAccount(account.id);
    document.getElementById("quantityCart").innerHTML = cart.listProduct.length;
    document.getElementById("avatar_user").src = account.avatar || "/asset/userDefault.png";
    document.getElementById("username_user").innerHTML = account.username;
  } else {
    window.location.href = "/admin.html";
  }
};

// check các kiểu
let auth = accountStore.getAuth();
let account;
if (auth) {
  updateNavMenu();
} else {
  window.location.href = "/login.html";
}
showHomePage();
