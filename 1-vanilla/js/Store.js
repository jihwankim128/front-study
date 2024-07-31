const tag = "[store]";

export default class Store {
  constructor(storage) {
    if (!storage) throw "no storage";

    this.storage = storage;
    this.searchResult = [];
    this.searchKeyword = "";
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((product) => 
      product.name.includes(keyword)
    );
  }
}
