export class Sheep {
	constructor(img, stageWidth) {
		this.img = img;

		this.totalFrame = 8; // 양의 프레임 = 8
		this.curFrame = 0; // 현재 프레임 

		this.imgWidth = 360;
		this.imgHeight = 300;

		// 그려질 양의 크기는 레티나 디스플레이를 고려해 이미지의 절반 사이즈로 정의
		this.sheepWidth = 180; 
		this.sheepHeight = 150;

		this.sheepWidthHalf = this.sheepWidth / 2;
		this.x = stageWidth + this.sheepWidth;
		this.y = 0;
		this.speed = Math.random() * 2 + 1;

		this.fps = 24; // adobe animate에서 양을 그릴 때 사용했던 fps
		this.fpsTime = 1000 / this.fps;
	}

	draw(ctx, t, dots) {
		// requestAnimationFrame 함수에서 넘겨받은 타임스탬프를 time으로 정의 
		if(!this.time) {
			this.time = t;
		}

		// fpsTime과 비교해 그 시간에 도달했을 때만 프레임 증가
		const now = t - this.time;
		if(now > this.fpsTime) { 
			this.time = t;
			this.curFrame += 1;
			if(this.curFrame == this.totalFrame) {
				this.curFrame = 0;
			}
		}

		this.animate(ctx, dots);
	}

	animate(ctx, dots) {
		this.x = 650;
		this.y = 550;

		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.fillStyle = '#000000';

		ctx.drawImage(
			this.img,
			this.imgWidth * this.curFrame,
			0,
			this.imgWidth,
			this.imgHeight,
			-this.sheepWidthHalf, // 하단 중앙을 중심점으로 하기 위해 x = 양의 절반, y = -양의 높이 + 그림에서 생기는 여백(20)
			-this.sheepHeight + 20, 
			this.sheepWidth,
			this.sheepHeight
		);
		ctx.restore();
	}
}