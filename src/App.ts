import 'style/index';

import Wheel from 'src/components/Wheel';
import ItemBoard from 'src/components/ItemBoard';
class App {
  $target: HTMLElement;
  $app: HTMLDivElement;
  $wheelSide: HTMLDivElement;
  $boardSide: HTMLDivElement;
  $rollButton: HTMLButtonElement;
  items: string[];
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
    this.$rollButton.textContent = '시작';
    this.$rollButton.onclick = () => {
      if (this.wheel.isRun) {
        this.wheel.stop();
        this.$rollButton.textContent = '시작';
      } else {
        this.wheel.run();
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
  setItems(items: string[]) {
    this.items = items;
    this.wheel.setProposition(items);
  }
}

export default App;
