class OrderService {
  constructor(name) {
    this.name = name;
    this.storage = new MyStorage(this.name);
    this.listOrder = this.storage.getInStorage();
  }

  createOrder(order) {
    this.listOrder.push(order);
    this.storage.saveDataInStorage(this.listOrder);
  }

  getOrderById(id) {
    return this.listOrder.find((item) => item.id === id);
  }

  getOrdersByAccountID(accountId) {
    return this.listOrder.filter((item) => item.accountId === accountId);
  }
}
