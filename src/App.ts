import 'style/index';

import Wheel from 'src/components/Wheel';
import ItemBoard from 'src/components/ItemBoard';

class App {
  $target: HTMLElement;
  $app: HTMLDivElement;
  $wheelSide: HTMLDivElement;
  $boardSide: HTMLDivElement;
  $rollButton: HTMLButtonElement;
  items: item[];
  wheel: Wheel;
  constructor($target: HTMLElement, wheelName: string) {
    this.$target = $target;
    this.$app = document.createElement('div');
    this.$app.className = 'random-wheel';
    this.items = [];
    $target.appendChild(this.$app);
    this.$wheelSide = document.createElement('div');
    this.$wheelSide.className = 'wheel-side';
    this.$boardSide = document.createElement('div');
    this.$boardSide.className = 'board-side';
    this.$app.appendChild(this.$wheelSide);
    this.$app.appendChild(this.$boardSide);

    const title: HTMLHeadingElement = document.createElement('h1');
    title.textContent = wheelName;
    this.$wheelSide.appendChild(title);
    this.wheel = new Wheel(this.$wheelSide);
    this.$rollButton = document.createElement('button');
    this.$rollButton.className = 'roll-button hidden';
    this.$rollButton.textContent = '시작';
    this.$rollButton.onclick = () => {
      //TODO: 항목들 추가/수정만 불가하도록 변경하기
      if (this.wheel.isRun) {
        this.$rollButton.classList.add('hidden');
        this.wheel.stop(() => {
          this.$boardSide.classList.remove('hidden');
          this.$rollButton.classList.remove('hidden');
          this.$rollButton.classList.remove('vibe');
          this.$rollButton.textContent = '시작';
        });
      } else {
        this.wheel.run();
        this.$boardSide.classList.add('hidden');
        this.$rollButton.classList.add('vibe');
        this.$rollButton.textContent = '멈춤';
      }
    };
    this.$wheelSide.appendChild(this.$rollButton);

    const itemBoard = new ItemBoard(this.$boardSide, (e) => {
      const boardItems = itemBoard.getItemsData();
      this.setItems(boardItems);
      itemBoard.render(this.items);
    });
    itemBoard.render([]);
  }
  setItems(items: item[]) {
    this.items = items;
    this.wheel.setProposition(items);
    if (this.items.length > 0) {
      this.$rollButton.classList.remove('hidden');
    } else {
      this.$rollButton.classList.add('hidden');
    }
  }
}

export default App;
