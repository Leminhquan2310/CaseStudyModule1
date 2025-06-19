const showProfileUser = () => {
  let html = `<!-- Sidebar -->
    <aside class="sidebar">
      <div class="avatar-section">
        <img src="https://i.pravatar.cc/100?img=3" alt="Avatar" class="avatar" />
        <h3>Nguyễn Văn A</h3>
      </div>
      <nav class="nav">
        <button class="nav-item active" onclick="showTab(event, 'profile')">👤 Thông tin cá nhân</button>
        <button class="nav-item" onclick="showTab(event, 'orders')">📦 Lịch sử đơn hàng</button>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="main-content">
      <!-- Tab 1: Profile -->
      <section id="profile" class="tab active">
        <h2>Thông Tin Cá Nhân</h2>
        <div class="profile-info">
          <p><strong>Họ tên:</strong> Nguyễn Văn A</p>
          <p><strong>Email:</strong> nguyenvana@email.com</p>
          <p><strong>Số điện thoại:</strong> 0909 999 999</p>
          <p><strong>Địa chỉ:</strong> 123 Lê Lợi, TP. Hồ Chí Minh</p>
        </div>
      </section>

      <!-- Tab 2: Orders -->
      <section id="orders" class="tab">
        <h2>Lịch Sử Đơn Hàng</h2>
        <div class="order-list">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Mã đơn</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>ORD001</td>
                <td>19/06/2025</td>
                <td>1.200.000₫</td>
                <td><span class="badge success">Đã giao</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>ORD002</td>
                <td>15/06/2025</td>
                <td>870.000₫</td>
                <td><span class="badge pending">Đang xử lý</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>`;

  document.getElementById("main_content").innerHTML = html;
};

function showTab(event, tabId) {
  // Ẩn tất cả tab
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Hiện tab được chọn
  document.getElementById(tabId).classList.add("active");

  // Cập nhật active cho menu
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.currentTarget.classList.add("active");
}
