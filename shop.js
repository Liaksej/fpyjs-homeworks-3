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
  constructor(id, name, description, size, price, available, amount) {
    super(id, name, description, size, price, available);
    this.amount = amount;
  }
}

class Basket {
  constructor(goods) {
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
  add(good, amount) {
    if (this.goods.find((element) => element.id === good)) {
      return this.goods.map((element, good) => (element.amount += amount));
    } else {
      return this.goods.push({ good: amount });
    }
  }
  remove(good, amount) {
    if (this.goods.good.amount - amount > 0) {
      return this.goods.map((element, good) => (element.amount -= amount));
    } else {
      return this.goods.splice((element) => element.id === good, 1);
    }
  }
  clear() {
    return (this.goods = []);
  }
  removeUnavailable() {
    return (this.goods = this.goods.filter((good) => good.available === true));
  }
}

let good1 = new Good(1, "Портер", "Темное пиво", [0.5, 1, 2], 50, true);
let good2 = new Good(2, "Лагер", "Светлое пиво", [0.5, 1, 2], 30, true);
let good3 = new Good(3, "IPA", "Крафтовое пиво", [0.3, 0.5], 100, false);
let good4 = new Good(4, "Sour", "Бельгийское пиво", [0.3, 0.5], 100, true);
let good5 = new Good(5, "Ale", "Английское пиво", [0.5, 1], 110, false);

let allGoods = new GoodsList([good1, good2, good3, good4, good5], /А-я/);

let cartItem1 = new BasketGood(
  1,
  "Портер",
  "Темное пиво",
  [0.5, 1, 2],
  50,
  true,
  20
);
let cartItem2 = new BasketGood(
  2,
  "Лагер",
  "Светлое пиво",
  [0.5, 1, 2],
  30,
  true,
  8
);

let shoppingCart = new Basket([cartItem1, cartItem2]);
