import 'style/index';

import Wheel from 'src/components/Wheel'
class App {
  $target: HTMLElement
  $app: HTMLDivElement
  $wheelSide: HTMLDivElement
  $boardSide: HTMLDivElement
  $rollButton: HTMLButtonElement
  constructor($target: HTMLElement, wheelName: string){
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
    title.textContent = wheelName;
    this.$wheelSide.appendChild(title);
    const wheel = new Wheel(this.$wheelSide)
    this.$rollButton = document.createElement('button')
    this.$rollButton.textContent = "시작"
    this.$rollButton.onclick = () => {
      if(wheel.isRun) {
        wheel.stop()
        this.$rollButton.textContent = "시작"
      } else {
        wheel.run();
        this.$rollButton.textContent = "멈춤"
      }
    }
    this.$wheelSide.appendChild(this.$rollButton);
  }

}

export default App;