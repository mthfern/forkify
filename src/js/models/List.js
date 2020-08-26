import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.itens = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };
    this.itens.push(item);
    return item;
  }

  deleteItem(id) {
    this.itens.splice(
      this.itens.findIndex((el) => el.id === id),
      1
    );
  }

  updateCount(id, newCount) {
    this.itens.find((el) => el.id === id).count = newCount;
  }
}
