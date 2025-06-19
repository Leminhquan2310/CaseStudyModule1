class BrandService {
  constructor(name) {
    this.name = name;
    this.storage = new MyStorage(this.name);
    this.listBrand = this.storage.getInStorage();
  }
  createBrand(brand) {
    this.listBrand.push(brand);
  }

  readBrand() {
    this.storage.saveDataInStorage(this.listBrand);
    return this.listBrand;
  }

  updateBrand(brand) {
    let index = this.listBrand.findIndex((item) => item.id === brand.id);
    this.listBrand[index] = brand;
  }

  deleteBrand(id) {
    let index = this.listBrand.findIndex((item) => item.id === id);
    this.listBrand.splice(index, 1);
  }

  findBrand(nameSearch) {
    return this.listBrand.filter((item) =>
      item.name.toLowerCase().includes(nameSearch.toLowerCase())
    );
  }

  getBrandMap() {
    return new Map(this.listBrand.map((b) => [b.id, b.name]));
  }

  getOneBrand(id) {
    return this.listBrand.find((item) => item.id === id);
  }
}
