class ResultBoard {
  $resultBoard: HTMLElement;
  constructor($target: HTMLElement) {
    this.$resultBoard = document.createElement('section');
    this.$resultBoard.className = 'result-board none-display';
    $target.appendChild(this.$resultBoard);
  }
  show(result: string, cb: () => void) {
    this.$resultBoard.innerText = result;
    this.$resultBoard.classList.remove('none-display');
    setTimeout(() => {
      this.$resultBoard.classList.add('none-display');
      cb();
    }, 3000);
  }
}

export default ResultBoard;
