class AccountService {
  constructor(name) {
    this.name = name;
    this.storage = new MyStorage(this.name);
    this.listAccount = this.storage.getInStorage();
  }

  createAccount(account) {
    this.listAccount.push(account);
    this.saveDataInStorage();
  }

  checkUsername(username) {
    return this.listAccount.some((item) => item.username === username);
  }

  login(username, password, isRemember) {
    let account = this.listAccount.find((item) => item.username === username);
    if (account) {
      if (account.password === password) {
        if (isRemember) {
          localStorage.setItem("auth", JSON.stringify({ id: account.id, role: account.role }));
        } else {
          sessionStorage.setItem("auth", JSON.stringify({ id: account.id, role: account.role }));
        }
        return account;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getAccount(id) {
    return this.listAccount.find((item) => item.id === id);
  }

  updateAccount(account) {
    let index = this.listAccount.findIndex((item) => item.id === account.id);
    this.listAccount[index] = account;
    this.saveDataInStorage();
  }

  changePassword(id, oldPass, newPass) {
    let index = this.listAccount.findIndex((item) => item.id === id);
    let account = this.listAccount[index];
    if (oldPass === account.password) {
      this.listAccount[index] = { ...account, password: newPass };
      this.saveDataInStorage();
      return this.listAccount[index];
    } else {
      return false;
    }
  }

  saveDataInStorage() {
    this.storage.saveDataInStorage(this.listAccount);
  }

  getAuth() {
    return JSON.parse(localStorage.getItem("auth")) || JSON.parse(sessionStorage.getItem("auth"));
  }

  logout() {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
  }
}
