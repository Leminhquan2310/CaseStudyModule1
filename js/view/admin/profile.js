const showProfile = () => {
  toggleMenuActive();
  let html = `
  <div class="profile-container">
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
    <h2 id="name">${account.fullname}</h2>
    <p class="role">Admin</p>

    <div class="info">
      <div>
        <label>Username:</label>
        <p id="username">${account.username}</p>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div id="info-fullname">
          <label>Fullname:</label>
          <p id="fullname">${account.fullname}</p>
        </div>
        <span id="icon_change_fullname" title="Change fullname" class="icon-change" onclick="showChangeFullname()">
            <i class="fa-solid fa-pencil"></i>
        </span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div id="info-password">
            <label>Password:</label>
            <p id="password">********</p>
        </div>
        <span id="icon_change_password" title="Change password" class="icon-change" onclick="showChangePassword()">
            <i class="fa-solid fa-pencil"></i>
        </span>
      </div>
    </div>


    <div id="btn_action" class="btn-group">
      <button class="btn logout" onclick="logout()">Log out</button>
    </div>
  </div>
`;
  document.getElementById("main-content").innerHTML = html;
};

const chooseFile = () => {
  document.getElementById("file-upload").click();
};

const changeAvatar = (e) => {
  let file = e.target.files[0];
  if (file) {
    const render = new FileReader();

    render.onload = (e) => {
      let base64String = e.target.result;

      document.getElementById("avatar").src = base64String;
      document.getElementById(
        "btn_action"
      ).innerHTML = `<button class="btn" onclick="editImageAccount('${base64String}')">Save</button>
    <button class="btn_cancel" onclick="showProfile()">Cancel</button>`;
    };

    render.readAsDataURL(file);
  }
};

const editImageAccount = (base64Img) => {
  account.avatar = base64Img;
  accountStore.updateAccount(account);
  showNotifySuccess(showProfile, "Change avatar success");
  document.getElementById("avatarAdmin").src = account.avatar;
};

const showChangePassword = () => {
  showProfile();
  let html = `<label>Old password:</label>
  <input type="password" id="oldPassword" required />
  <label>New password:</label>
  <input type="password" id="newPassword" required />
  <label>Confirm new password:</label>
  <input type="password" id="confirmPassword" required />
  `;
  document.getElementById("info-password").innerHTML = html;
  let iconElement = document.getElementById("icon_change_password");
  iconElement.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
  iconElement.style.color = "red";
  iconElement.title = "Close Change";
  iconElement.onclick = showProfile;
  let btnACtion = document.getElementById("btn_action");
  btnACtion.innerHTML = `<button class="btn" onclick="changePassword()">Save</button>`;
};

const changePassword = () => {
  let oldP = document.getElementById("oldPassword").value;
  let newP = document.getElementById("newPassword").value;
  let conP = document.getElementById("confirmPassword").value;

  if (!oldP || !newP || !conP) {
    Swal.fire({
      icon: "error",
      text: "Please enter complete information!",
    });
    return;
  }

  if (conP === newP) {
    let result = accountStore.changePassword(account.id, oldP, newP);
    if (result) {
      showNotifySuccess(showProfile, "Change password success");
    } else {
      Swal.fire({
        icon: "error",
        text: "Old password incorrect!",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      text: "Confirm password incorrect!",
    });
  }
};

const showChangeFullname = () => {
  showProfile();
  let html = `<label>Fullname:</label>
  <input type="text" id="newFullname" value="${account.fullname}" />`;
  document.getElementById("info-fullname").innerHTML = html;
  let iconElement = document.getElementById("icon_change_fullname");
  iconElement.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
  iconElement.style.color = "red";
  iconElement.title = "Close Change";
  iconElement.onclick = showProfile;
  let btnACtion = document.getElementById("btn_action");
  btnACtion.innerHTML = `<button class="btn" onclick="changeFullname()">Save</button>`;
};

const changeFullname = () => {
  let fullname = document.getElementById("newFullname").value;
  if (!fullname) {
    showProfile();
  }
  account.fullname = fullname;
  accountStore.updateAccount(account);
  showNotifySuccess(showProfile, "Change fullname success");
};

const logout = () => {
  accountStore.logout();
  window.location.href = "/login.html";
};
