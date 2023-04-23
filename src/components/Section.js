export class Section {
  constructor({ items, renderer }, sectionElements) {
    this._items = items;
    this._renderer = renderer;
    this._sectionElements = document.querySelector(sectionElements);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._sectionElements.prepend(element);
  }
}
