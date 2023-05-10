export class Section {
  constructor({ items, renderer }, sectionElements) {
    this._items = items;
    this._renderer = renderer;
    this._sectionElements = document.querySelector(sectionElements);
  }

  renderItems(items) {
    for (let i = items.length - 1; i > -1; i--) {
      this._renderer(items[i]);
    }
  }

  addItem(element) {
    this._sectionElements.prepend(element);
  }
}