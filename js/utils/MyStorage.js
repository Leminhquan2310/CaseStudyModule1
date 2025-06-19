class MyStorage {
  constructor(name) {
    this.name = name;
  }

  getInStorage() {
    return JSON.parse(localStorage.getItem(this.name)) || [];
  }

  saveDataInStorage(value) {
    localStorage.setItem(this.name, JSON.stringify(value));
  }
}
