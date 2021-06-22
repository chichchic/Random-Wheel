type proposition = { label: string; rate: number };

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
      { label: '돌림판', rate: 33.333 },
      { label: '돌림판', rate: 33.333 },
      { label: '돌림판', rate: 33.333 },
    ];
    this.rotateAngle = 0;
    this.render();
    this.speed = 0;
    this.isRun = false;
  }
  render() {
    const ctx = this.$ctx;
    let accAngle = this.rotateAngle;
    this.proposition.forEach(({ label, rate }, index) => {
      const beginRadian = (accAngle / 180) * Math.PI;
      accAngle += rate * 3.6;
      const endRadian = (accAngle / 180) * Math.PI;
      const beginX = 350 + 300 * Math.sin(beginRadian);
      const beginY = 350 - 300 * Math.cos(beginRadian);
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
      ctx.stroke();
    });
  }
  roll() {
    this.$ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
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
