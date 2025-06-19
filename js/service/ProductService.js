class ProductService {
  constructor(name) {
    this.name = name;
    this.storage = new MyStorage(this.name);
    this.listProduct = this.storage.getInStorage();
  }

  createProduct(product) {
    this.listProduct.push(product);
  }

  readProduct() {
    this.storage.saveDataInStorage(this.listProduct);
    return this.listProduct;
  }

  updateProduct(product) {
    let index = this.listProduct.findIndex((item) => item.id === product.id);
    this.listProduct[index] = product;
  }

  deleteProduct(id) {
    let index = this.listProduct.findIndex((item) => item.id === id);
    this.listProduct.splice(index, 1);
  }

  findProduct(nameSearch) {
    return this.listProduct.filter((item) =>
      item.name.toLowerCase().includes(nameSearch.toLowerCase())
    );
  }

  findProductFilter(cateId, brandId, priceFilter, quantityFilter) {
    return this.listProduct.filter((item) => {
      const matchCategory = cateId ? item.category_id === cateId : true;
      const matchBrand = brandId ? item.brand_id === brandId : true;
      const matchPrice = priceFilter ? item.price <= priceFilter : true;
      const matchQuantity = quantityFilter ? item.quantity <= quantityFilter : true;
      return matchCategory && matchBrand && matchPrice && matchQuantity;
    });
  }

  getOneProduct(id) {
    return this.listProduct.find((item) => item.id == id);
  }

  getBrandName(id) {
    let brands = new BrandService("listBrand");
    return brands.getBrandMap().get(id);
  }

  getCategoryName(id) {
    let categories = new CategoryService("listCategory");
    return categories.getCateMap().get(id);
  }

  getMaxPrice() {
    let max = 0;
    this.listProduct.map((i) => {
      if (i.price > max) max = i.price;
    });
    return max;
  }

  getMaxQuantity() {
    let max = 0;
    this.listProduct.map((i) => {
      if (i.quantity > max) max = i.quantity;
    });
    return max;
  }
}
