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
    this.proposition = [];
    this.rotateAngle = 0;
    this.render();
    this.speed = 0;
    this.isRun = false;
  }
  init() {
    this.proposition = [
      { label: '돌림판', color: makeRandomColor(), rate: 50 },
      { label: '돌림판', color: makeRandomColor(), rate: 50 },
    ];
    this.rotateAngle = 30;
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
    if (this.proposition.length === 0) {
      this.proposition = [
        { label: '돌림판', color: makeRandomColor(), rate: 50 },
        { label: '돌림판', color: makeRandomColor(), rate: 50 },
      ];
      this.rotateAngle = -30;
      console.log('init');
    }
    this.$ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    const ctx = this.$ctx;
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(350, 350, 300, 0, 2 * Math.PI);
    ctx.stroke();
    let accAngle = this.rotateAngle;
    ctx.lineWidth = 5;
    this.proposition.forEach(({ label, color, rate }) => {
      const beginRadian = (accAngle / 180) * Math.PI;
      accAngle += rate * 3.6;
      const endRadian = (accAngle / 180) * Math.PI;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(350, 350);
      ctx.arc(
        350,
        350,
        300,
        beginRadian - Math.PI * 0.5,
        endRadian - Math.PI * 0.5
      );
      ctx.fill();
      ctx.save();
      ctx.translate(350, 350);
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      const textX = 90;
      const textY = 0;
      ctx.rotate(-Math.PI / 2 + (endRadian + beginRadian) / 2);
      ctx.fillStyle = '#000033';
      ctx.font = '24px Courier New';
      ctx.strokeText(label, textX, textY);
      ctx.fillStyle = 'white';
      ctx.font = '24px Courier New';
      ctx.fillText(label, textX, textY);
      ctx.restore();
    });
    ctx.fillStyle = '#000033';
    ctx.beginPath();
    ctx.moveTo(350, 60);
    ctx.lineTo(350 - 15, 35);
    ctx.lineTo(350 - 15, 25);
    ctx.lineTo(350 + 15, 25);
    ctx.lineTo(350 + 15, 35);
    ctx.closePath();
    ctx.fill();
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
    this.speed = 20;
    this.roll();
  }
  stop(callback: () => void | undefined): number | undefined {
    if (this.speed > 0) {
      this.speed -= 0.1;
      return requestAnimationFrame(this.stop.bind(this, callback));
    }
    callback();
    this.isRun = false;
  }
}

export default Wheel;
