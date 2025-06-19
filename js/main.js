const productStore = new ProductService("listProduct");
const brandStore = new BrandService("listBrand");
const categoryStore = new CategoryService("listCategory");
let accountStore = new AccountService("listAccount");
let account;
let auth = accountStore.getAuth();
if (auth) {
  account = accountStore.getAccount(auth.id);
  if (account.role === 0) {
    document.getElementById("nameAdmin").innerText = account.username;
    document.getElementById("avatarAdmin").src = account.avatar || "/asset/userDefault.png";
  } else {
    window.location.href = "/index.html";
  }
} else {
  window.location.href = "/login.html";
}

showProductManage();
