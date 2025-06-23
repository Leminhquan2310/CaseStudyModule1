const showProfileUser = () => {
  let html = `<!-- Sidebar -->
    <div class="profile_container">
        <aside class="sidebar">
          <div class="avatar-container">
            <img id="avatar" src="${
              account.avatar || "/asset/userDefault.png"
            }" alt="avatar" class="avatar" />
            <div class="overlay" onclick="chooseFile()">
              <label>
                <i class="fa fa-camera"></i>
              </label>
              <input type="file" id="file-upload" onchange="changeAvatar(event)" style="display: none" />
            </div>
            </div>
            <h3 style="margin-bottom: 10px">${account.fullname}</h3>
          <nav class="nav">
            <button class="nav-item active" onclick="showTab(event, 'profile')">👤 Your Profile</button>
            <button class="nav-item" onclick="showTab(event, 'order')" id="orderHistoryTab">📦 Orders History</button>
            <button class="nav-item-logout" onclick="logout()">🔚 Logout</button>
          </nav>
        </aside>
    
        <!-- Main content -->
        <main id="main_profile" class="main-content">
        </main>
    </div>`;

  document.getElementById("main_content").innerHTML = html;
  showProfile();
};

const showProfile = () => {
  let info = accountStore.getAccount(account.id);
  let html = `<section>
        <h2>Your Profile</h2>
        <div class="profile-info">
          <p><strong>Username:</strong> ${info.username}</p>
          <p><strong>phoneNumber:</strong> <input class="input-basic" id="phone" type="text" value="${
            info.phoneNumber || ""
          }" /></p>
          <p><strong>address:</strong> <input class="input-basic" id="address" type="text" value="${
            info.address || ""
          }" /></p>
        </div>
        <button class="btn_change_info" onclick="saveInformation()">Save</button>
      </section>`;
  document.getElementById("main_profile").innerHTML = html;
};

const showOrderList = () => {
  let orders = orderStore.getOrdersByAccountID(account.id);
  orders.reverse();
  let html = `<section id="orders">
        <h2>Order History</h2>
        <div class="" id="myModal">
         
        </div> 
        <i>*(Double click to seen order detail)</i>
        <div class="order-list">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Code order</th>
                <th>Date</th>
                <th>Total Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>`;
  orders
    .map((item, index) => {
      html += `<tr id="${item.id}" ondblclick="showOrderDetail('${item.id}')" class="order_item">
                <td>${index + 1}</td>
                <td>${item.id}</td>
                <td>${item.createdAt}</td>
                <td>${item.totalQuantity}</td>
                <td>$${item.totalAmount}</td>
                <td><span class="badge ${item.status}">${item.status}</span></td>
              </tr>`;
    })
    .join("");
  html += `</tbody></table></div></section>`;
  document.getElementById("main_profile").innerHTML = html;
};

const showTab = (event, tabId) => {
  // Cập nhật active cho menu
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.currentTarget.classList.add("active");
  switch (tabId) {
    case "profile":
      showProfile();
      break;
    case "order":
      showOrderList();
      break;
    default:
  }
};

const saveInformation = () => {
  let phoneNumber = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let newAccount = { ...account, phoneNumber, address };
  accountStore.updateAccount(newAccount);
  showNotifySuccess(showProfile, "Updated information");
};

const chooseFile = () => {
  document.getElementById("file-upload").click();
};

const changeAvatar = (event) => {
  let file = event.target.files[0];
  if (file) {
    let render = new FileReader();

    render.onload = (e) => {
      let base64String = e.target.result;

      document.getElementById("avatar").src = base64String;
      accountStore.updateAccount({ ...account, avatar: base64String });
      updateNavMenu();
      showNotifySuccess(showProfile, "Updated avatar");
    };

    render.readAsDataURL(file);
  }
};

const logout = () => {
  Swal.fire({
    text: "Are you sure logout?!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, Let's logout!",
  }).then((result) => {
    if (result.isConfirmed) {
      accountStore.logout();
      window.location.href = "/login.html";
    }
  });
};

const showOrderDetail = (id) => {
  let order = orderStore.getOrderById(id);
  let html = `  <div class="modal-content">
    <span class="close" onclick="hideOrderDetail()">&times;</span>
    <span class="statusCircle ${order.status}">${order.status}</span>
    <h2>Order Detail </h2>
    <div class="order-info">
      <p><strong>ID:</strong> <span id="orderId">${order.id}</span></p>
      <p><strong>Total Quantity:</strong> <span id="totalQuantity">${order.totalQuantity}</span></p>
      <p><strong>Total Amount:</strong> <span id="totalAmount">$${order.totalAmount}</span></p>
    </div>
    <h3>List product order</h3>
    <table class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Unit price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${order.products
          .map((item) => {
            return `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.quantity * item.price}</td>
          </tr>`;
          })
          .join("")}
      </tbody>
    </table>
      <button class="btn_cancel" ${
        order.status !== "Pending" ? "disabled" : ""
      } onclick="cancelOrder('${id}')">Cancel order</button>
  </div>`;
  document.getElementById("myModal").classList.add("modal");
  document.getElementById("myModal").innerHTML = html;
};

const hideOrderDetail = () => {
  document.getElementById("myModal").classList.remove("modal");
  document.getElementById("myModal").innerHTML = "";
};

const cancelOrder = (id) => {
  Swal.fire({
    text: "Are you sure to cancel this order?!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, i agree!",
  }).then((result) => {
    if (result.isConfirmed) {
      orderStore.updateStatus(id, "Canceled");
      showNotifySuccess(showOrderList, "Your order have been canceled!");
    }
  });
};

const hightLightField = (fieldId) => {
  let field = document.getElementById(fieldId);
  if (field) {
    field.scrollIntoView({ behavior: "smooth", block: "center" });

    field.classList.add("highlight");

    setTimeout(() => {
      field.classList.remove("highlight");
    }, 2000);
  }
};
