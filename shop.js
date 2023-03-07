class Good {
  constructor(id, name, description, size, price, available) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.size = size;
    this.price = price;
    this.available = available;
  }
  setAvailable(available) {
    return (this.available = available);
  }
}
class GoodsList {
  #goods;
  constructor(goods, filter, sortPrice, sortDir) {
    this.#goods = goods;
    this.filter = filter;
    this.sortPrice = sortPrice;
    this.sortDir = sortDir;
  }
  get list() {
    return this.#goods
      .filter((good) => this.filter.test(good.name))
      .sort((a, b) => a.price - b.price);
  }
  add(good) {
    return this.#goods.push(good);
  }
  remove(id) {
    return this.#goods.splice((element) => element.id === id, 1);
  }
}

class BasketGood extends Good {
  constructor(id, name, description, size, price, available, amount, goods) {
    super(id, name, description, size, price, available);
    this.amount = amount;
    this.goods = goods;
  }
  get totalAmount() {
    return this.goods.reduce(
      (accumulator, currentElement) => accumulator + currentElement.amount
    );
  }
  get totalSum() {
    let totalSum;
    this.goods.forEach((good) => (totalSum += good.price));
    return totalSum;
  }
}
