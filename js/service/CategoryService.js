class CategoryService {
  constructor(name) {
    this.name = name;
    this.storage = new MyStorage(this.name);
    this.listCategory = this.storage.getInStorage();
  }

  createCate(cate) {
    this.listCategory.push(cate);
  }

  readCate() {
    this.storage.saveDataInStorage(this.listCategory);
    return this.listCategory;
  }

  updateCate(cate) {
    let index = this.listCategory.findIndex((item) => item.id === cate.id);
    this.listCategory[index] = cate;
  }

  deleteCate(id) {
    let index = this.listCategory.findIndex((item) => item.id === id);
    this.listCategory.splice(index, 1);
  }

  findCate(nameSearch) {
    return this.listCategory.filter((item) =>
      item.name.toLowerCase().includes(nameSearch.toLowerCase())
    );
  }

  getCateMap() {
    return new Map(this.listCategory.map((c) => [c.id, c.name]));
  }

  getOneCate(id) {
    return this.listCategory.find((item) => item.id === id);
  }
}
