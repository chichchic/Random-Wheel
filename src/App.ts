import 'style/index';

import Wheel from 'src/components/Wheel'
class App {
  $target: HTMLElement
  $app: HTMLDivElement
  $wheelSide: HTMLDivElement
  $boardSide: HTMLDivElement
  constructor($target: HTMLElement){
    this.$target = $target;
    this.$app = document.createElement('div');
    this.$app.className = "random-wheel"
    $target.appendChild(this.$app);
    this.$wheelSide = document.createElement('div');
    this.$wheelSide.className = 'wheel-side'
    this.$boardSide = document.createElement('div');
    this.$boardSide.className = 'board-side'
    this.$app.appendChild(this.$wheelSide)
    this.$app.appendChild(this.$boardSide)
    const title:HTMLHeadingElement = document.createElement('h1');
    this.$wheelSide.appendChild(title);
    new Wheel(this.$wheelSide)
  }
}

export default App;