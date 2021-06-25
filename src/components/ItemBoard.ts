class ItemBoard {
  $itemBoard: HTMLUListElement;
  blurEvent: (this: GlobalEventHandlers, e: FocusEvent) => void;
  removeEvent: (index: number) => void;
  constructor(
    $target: HTMLDivElement,
    blurEvent: (this: GlobalEventHandlers, e: FocusEvent) => void,
    removeEvent: (index: number) => void
  ) {
    this.$itemBoard = document.createElement('ul');
    this.blurEvent = blurEvent;
    this.removeEvent = removeEvent;
    $target.appendChild(this.$itemBoard);
    this.render([]);
  }
  render(itemList: item[]) {
    this.clear();
    itemList.forEach(({ label, color }, index) => {
      const item = this.makeItem('item', color, label, index + 1);
      this.$itemBoard.appendChild(item);
    });
    const emptyItem = this.makeItem('item empty');
    this.$itemBoard.appendChild(emptyItem);
  }
  getItemsData() {
    const itemLabels = this.$itemBoard.querySelectorAll('.item-label');
    return Array.from(itemLabels)
      .map((el) => ({
        label: (el as HTMLInputElement).value,
      }))
      .filter(({ label }) => label !== '');
  }
  //FIXME: 삭제 - 삽입 - 렌더링 순서 다시 한번 살펴보기
  makeItem(
    className: string,
    color: string = '#ddd',
    label = '',
    index: number | '+' = '+'
  ): HTMLLIElement {
    const item = document.createElement('li');
    item.dataset.index = <string>index;
    item.setAttribute('style', `--item-color: ${color}`);
    item.className = className;
    const itemLabel = document.createElement('input');
    itemLabel.className = 'item-label';
    itemLabel.value = label;
    item.onclick = () => itemLabel.focus();
    itemLabel.onblur = this.blurEvent;
    item.appendChild(itemLabel);
    if (index !== '+') {
      const removeButton = document.createElement('button');
      removeButton.onclick = () => {
        this.removeEvent(index - 1);
        item.remove();
      };
      removeButton.className = 'remove-button';
      removeButton.innerText = 'X';
      item.appendChild(removeButton);
    }
    return item;
  }
  clear() {
    this.$itemBoard.innerHTML = '';
  }
}

export default ItemBoard;
