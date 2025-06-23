class OrderService {
  constructor(name) {
    this.name = name;
    this.storage = new MyStorage(this.name);
    this.listOrder = this.storage.getInStorage();
  }

  createOrder(order) {
    this.listOrder.push(order);
    let accountAdmin = accountStore.listAccount.filter((item) => item.role === 0);
    accountAdmin.map((item) => {
      accountStore.updateMessage(item.id, order.id);
    });
    this.storage.saveDataInStorage(this.listOrder);
    accountStore.saveDataInStorage(accountStore.listAccount);
  }

  getOrderById(id) {
    return this.listOrder.find((item) => item.id === id);
  }

  getOrdersByAccountID(accountId) {
    return this.listOrder.filter((item) => item.accountId === accountId);
  }

  getOrderByFilter(date, status) {
    return this.listOrder.filter((item) => {
      let matchStatus = status ? item.status == status : true;
      let matchDate = date ? item.createdAt == date : true;
      return matchDate && matchStatus;
    });
  }

  readOrder() {
    return [...this.listOrder].reverse();
  }

  updateStatus(id, status) {
    let index = this.listOrder.findIndex((item) => item.id === id);
    let order = this.listOrder[index];
    // update message
    accountStore.updateMessage(order.accountId, { orderId: order.id, status: status });

    // update status
    this.listOrder[index].status = status;
    this.storage.saveDataInStorage(this.listOrder);
  }
}
