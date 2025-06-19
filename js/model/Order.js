class Order {
  constructor(id, accountId, products, totalQuantity, totalAmount, createdAt) {
    this.id = id;
    this.accountId = accountId;
    this.products = products;
    this.totalQuantity = totalQuantity;
    this.totalAmount = totalAmount;
    this.status = "Pending";
    this.createdAt = createdAt;
  }
}
