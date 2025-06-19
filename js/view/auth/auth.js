let accountStore = new AccountService("listAccount");

const registerAccount = (e) => {
  e.preventDefault();
  let id = randomId(9999);
  let fullname = document.getElementById("fullname").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let role = 1;
  if (accountStore.checkUsername(username)) {
    Swal.fire({
      icon: "error",
      title: "Sign up failed!",
      text: "Username already exists!",
    });
    return;
  }
  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Sign up failed!",
      text: "Password confirm incorrect!",
    });
    return;
  }
  let account = new Account(id, username, password, fullname, role);
  accountStore.createAccount(account);
  Swal.fire({
    title: "Success",
    text: "You have successfully created an account",
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Sign In",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/login.html";
    }
  });
};

const loginToApp = (e) => {
  e.preventDefault();
  let uname = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let remember = document.getElementById("remember").checked;
  let result = accountStore.login(uname, pass, remember);
  if (result) {
    if (result.role === 1) {
      window.location.href = "/index.html";
    } else {
      window.location.href = "/admin.html";
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Sign in failed!",
      text: "Username or password not match",
    });
  }
};
