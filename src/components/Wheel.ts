import { makeRandomColor } from 'src/utils/color';
interface proposition extends item {
  rate: number;
}

class Wheel {
  $target: HTMLElement;
  $canvas: HTMLCanvasElement;
  $ctx: CanvasRenderingContext2D;
  proposition: proposition[];
  rotateAngle: number;
  speed: number;
  isRun: boolean;
  constructor($target: HTMLElement) {
    this.$target = $target;
    this.$canvas = document.createElement('canvas');
    this.$canvas.width = 700;
    this.$canvas.height = 700;
    this.$ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
    this.$target.appendChild(this.$canvas);
    this.proposition = [
      { label: '돌림판', color: makeRandomColor(), rate: 50 },
      { label: '돌림판', color: makeRandomColor(), rate: 50 },
    ];
    this.rotateAngle = 0;
    this.render();
    this.speed = 0;
    this.isRun = false;
  }
  setProposition(items: item[]) {
    this.proposition = items.map(({ label, color }) => ({
      label,
      color,
      rate: Math.floor((100 / items.length) * 1000) / 1000,
    }));
    this.rotateAngle = 0;
    this.render();
  }
  render() {
    this.$ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    const ctx = this.$ctx;
    let accAngle = this.rotateAngle;
    this.proposition.forEach(({ label, color, rate }, index) => {
      const beginRadian = (accAngle / 180) * Math.PI;
      accAngle += rate * 3.6;
      const endRadian = (accAngle / 180) * Math.PI;
      const beginX = 350 + 300 * Math.sin(beginRadian);
      const beginY = 350 - 300 * Math.cos(beginRadian);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(350, 350);
      ctx.lineTo(beginX, beginY);
      ctx.arc(
        350,
        350,
        300,
        beginRadian - Math.PI * 0.5,
        endRadian - Math.PI * 0.5
      );
      ctx.fill();
    });
  }
  roll() {
    this.render();
    if (this.speed > 0) {
      this.rotateAngle += this.speed;
      requestAnimationFrame(this.roll.bind(this));
    }
  }
  run() {
    this.isRun = true;
    this.speed = 10;
    this.roll();
  }
  stop(): number | undefined {
    if (this.speed > 0) {
      this.speed -= 0.3;
      return requestAnimationFrame(this.stop.bind(this));
    }
    this.isRun = false;
  }
}

export default Wheel;
