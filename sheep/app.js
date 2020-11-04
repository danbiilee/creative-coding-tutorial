import { Hill } from './hill.js';
import { SheepController } from './sheep-controller.js';

class App {
	constructor() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);

		// 앞의 언덕을 빠르게, 뒤의 언덕을 느리게 설정해주면 3d효과
		this.hills = [
			new Hill('#fd6bea', 0.2, 12),
			new Hill('#ff59c2', 0.5, 8),
			new Hill('#ff4674', 1.4, 6)
		];

		// 양 떼 관리자 추가
		this.sheepController = new SheepController();

		window.addEventListener('resize', this.resize.bind(this), false);
		this.resize();

		requestAnimationFrame(this.animate.bind(this));
	}

	resize() {
		this.stageWidth = document.body.clientWidth;
		this.stageHeight = document.body.clientHeight;

		// 레티나 디스플레이에서도 선명하게 보이도록 캔버스 사이즈 2배 
		this.canvas.width = this.stageWidth * 2;
		this.canvas.height = this.stageHeight * 2;
		this.ctx.scale(2, 2);

		for (let i=0; i<this.hills.length; i++) {
			this.hills[i].resize(this.stageWidth, this.stageHeight);
		}

		this.sheepController.resize(this.stageWidth, this.stageHeight);
	}
	
	animate(t) {
		requestAnimationFrame(this.animate.bind(this));
		
		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight); // 캔버스 지우기 
		
		let dots;
		for (let i=0; i<this.hills.length; i++) {
			dots = this.hills[i].draw(this.ctx);
		}

		// FPS를 정의하기 위해 timestamp를 파라미터로 전달 
		this.sheepController.draw(this.ctx, t, dots);
	}
}

window.onload = () => {
	new App();
}