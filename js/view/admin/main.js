const productStore = new ProductService("listProduct");
const brandStore = new BrandService("listBrand");
const categoryStore = new CategoryService("listCategory");
let orderStore = new OrderService("listOrder");
let accountStore = new AccountService("listAccount");
let account;
let auth = accountStore.getAuth();

const showNotifyOrder = (message) => {
  toastr.options = {
    positionClass: "toast-bottom-right",
    showMethod: "show",
    closeButton: true, // Hiện nút "x" để tắt
    timeOut: 0, // Không tự động ẩn sau thời gian
    extendedTimeOut: 0, // Không ẩn khi rê chuột ra ngoài
    onclick: () => {
      document.getElementById("orderTab").click();
      hightLightField(message);
    },
  };
  toastr.info(`We have ${message.length} new orders!`);
  accountStore.clearMessage(account.id);
};

if (auth) {
  account = accountStore.getAccount(auth.id);
  if (account.role === 0) {
    document.getElementById("nameAdmin").innerText = account.username;
    document.getElementById("avatarAdmin").src = account.avatar || "/asset/userDefault.png";
    if (account.message.length > 0) {
      showNotifyOrder(account.message);
    }
  } else {
    window.location.href = "/index.html";
  }
} else {
  window.location.href = "/login.html";
}

showProductManage();
