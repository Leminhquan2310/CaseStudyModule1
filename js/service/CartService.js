class CartService {
  constructor(name) {
    this.name = name;
    this.storage = new MyStorage(this.name);
    this.listCart = this.storage.getInStorage();
  }

  createCart(cart) {
    this.listCart.push(cart);
    this.storage.saveDataInStorage(this.listCart);
  }

  getCartByAccount(accountId) {
    let cart = this.listCart.find((item) => item.accountId === accountId);
    if (!cart) {
      let id = randomId(99999);
      let aCart = new Cart(id, accountId, [], 0);
      this.createCart(aCart);
      return aCart;
    }
    return cart;
  }

  updateAddProduct(accountId, product) {
    let index = this.listCart.findIndex((item) => item.accountId === accountId);
    this.listCart[index].listProduct.push(product);
    this.storage.saveDataInStorage(this.listCart);
  }

  deleteProduct(accountId, productId) {
    let index = this.listCart.findIndex((item) => item.accountId === accountId);
    let newCart = this.listCart[index].listProduct.filter((item) => item !== productId);
    this.listCart[index].listProduct = newCart;
    this.storage.saveDataInStorage(this.listCart);
  }

  getProductCart(accountId) {
    let yourCart = this.getCartByAccount(accountId);
    let listProductCart = [];
    let totalAmount = 0;
    let totalQuantity = 0;

    yourCart.listProduct.map((item) => {
      let product = productStore.getOneProduct(item);
      let index = listProductCart.findIndex((item) => item.id === product.id);
      totalAmount += product.price;
      totalQuantity += 1;
      if (index > -1) {
        listProductCart[index] = {
          ...listProductCart[index],
          quantity: listProductCart[index].quantity + 1,
        };
      } else {
        listProductCart.push({ ...product, quantity: 1 });
      }
    });
    return { listProductCart, totalAmount, totalQuantity };
  }

  clearCart(accountId) {
    let index = this.listCart.findIndex((item) => item.accountId === accountId);
    this.listCart[index].listProduct = [];
    this.storage.saveDataInStorage(this.listCart);
  }
}
