class ItemBoard {
  $itemBoard: HTMLUListElement;
  addEvent: (this: GlobalEventHandlers, e: FocusEvent) => void;
  constructor(
    $target: HTMLDivElement,
    addEvent: (this: GlobalEventHandlers, e: FocusEvent) => void
  ) {
    this.$itemBoard = document.createElement('ul');
    this.addEvent = addEvent;
    $target.appendChild(this.$itemBoard);
  }
  render(itemlList: string[]) {
    this.clear();
    itemlList.forEach((label) => {
      const item = this.makeItem('item', label);
      this.$itemBoard.appendChild(item);
    });
    const emptyItem = this.makeItem('item empty');
    this.$itemBoard.appendChild(emptyItem);
  }

  getItemsData() {
    const itemLables = this.$itemBoard.querySelectorAll('.item-lable');
    return Array.from(itemLables)
      .map((el) => (el as HTMLInputElement).value)
      .filter((val) => val !== '');
  }
  makeItem(className: string, label = ''): HTMLLIElement {
    const item = document.createElement('li');
    item.className = className;
    const itemLable = document.createElement('input');
    itemLable.className = 'item-lable';
    itemLable.value = label;
    itemLable.onblur = this.addEvent;
    item.appendChild(itemLable);
    return item;
  }
  clear() {
    this.$itemBoard.innerHTML = '';
  }
}

export default ItemBoard;
