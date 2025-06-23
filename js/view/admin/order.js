const showOrderManage = (event) => {
  if (event) {
    toggleMenuActive();
    event.target.classList.add("active");
  }
  let list = orderStore.readOrder();
  let html = `<h1>ORDER MANAGEMENT</h1>
          <div class="" id="myModal">
          </div>
          <div class="filterOrder">
          <div class="selectStatus">
            <select id="statusFilter">
              <option value="">-- All status --</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipping">Shipping</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
          <input type="date" id="dateFilter" />
          <button onclick="filterOrder()" class="btn_filter">Filter</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Account ID</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>products</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="order-table" class="order_table"></tbody>
        </table>`;
  document.getElementById("main-content").innerHTML = html;
  showDataOrder(list);
};

const showDataOrder = (list) => {
  let html = ``;
  list
    .map((item, index) => {
      html += `<tr id="${item.id}" ondblclick="checkOrder('${item.id}')">
            <td>${index + 1}</td>
            <td>${item.id}</td>
            <td>${item.accountId}</td>
            <td>${item.totalQuantity}</td>
            <td>$${item.totalAmount}</td>
            <td>Products (${item.products.length})</td>
            <td>${item.createdAt}</td>
            <td><span class="badge ${item.status}">${item.status}</span></td>
            <td>
                ${
                  item.status == "Delivered" ||
                  item.status == "Canceled" ||
                  item.status == "Returned"
                    ? ""
                    : `<button
                      class="btn_change"
                      onclick="openModalUpdateStatus('${item.id}', '${item.status}')"
                    >
                      Update Status
                    </button>`
                }
            </td>
        </tr>`;
    })
    .join("");
  document.getElementById("order-table").innerHTML = html;
};

function openModalUpdateStatus(id, status) {
  let listStatus = ["Pending", "Confirmed", "Shipping", "Delivered", "Canceled", "Returned"];
  let mainStatusIndex = listStatus.findIndex((item) => item === status);
  let html = ` <div class="modal-content">
                <span class="close" onclick="closeModalUpdateStatus()">&times;</span>
                <h3>Update Status</h3>
                <select id="status" value="${status}">`;
  for (let i = mainStatusIndex >= 0 ? mainStatusIndex + 1 : 1; i < listStatus.length; i++) {
    html += `<option value="${listStatus[i]}">${listStatus[i]}</option>`;
  }
  html += `</select>
                <button class="btn_save" onclick="changeStatus('${id}')">Save</button>
            </div>`;
  document.getElementById("myModal").classList.add("modal");
  document.getElementById("myModal").innerHTML = html;
}

function closeModalUpdateStatus() {
  document.getElementById("myModal").classList.remove("modal");
  document.getElementById("myModal").innerHTML = "";
}

const changeStatus = (id) => {
  let status = document.getElementById("status").value;
  orderStore.updateStatus(id, status);
  showNotifySuccess(showOrderManage, "Updated");
  closeModalUpdateStatus();
};

const filterOrder = () => {
  let date = document.getElementById("dateFilter").value;
  let status = document.getElementById("statusFilter").value;
  let newDate = "";
  if (date) {
    let [year, month, day] = date.split("-");
    newDate = day + "/" + month + "/" + year;
  }
  let list = orderStore.getOrderByFilter(newDate, status);
  showDataOrder(list);
};

const checkOrder = (id) => {
  let order = orderStore.getOrderById(id);
  let html = `  <div class="modal-content">
    <span class="close" onclick="closeModalUpdateStatus()">&times;</span>
    <h2>Order Detail</h2>
    <div class="order-info">
      <p><strong>ID:</strong> <span id="orderId">${order.id}</span></p>
      <p><strong>Account ID:</strong> <span id="accountId">${order.accountId}</span></p>
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
  </div>`;
  document.getElementById("myModal").classList.add("modal");
  document.getElementById("myModal").innerHTML = html;
};

const hightLightField = (messages) => {
  messages.map((item) => {
    let field = document.getElementById(item);
    if (field) {
      field.classList.add("highlight");

      setTimeout(() => {
        field.classList.remove("highlight");
      }, 2000);
    }
  });
};
