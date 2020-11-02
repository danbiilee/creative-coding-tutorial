export class Hill {
	constructor(color, speed, total) {
		this.color = color;
		this.speed = speed;
		this.total = total;
	}

	resize(stageWidth, stageHeight) {
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;

		this.points = [];
		this.gap = Math.ceil(this.stageWidth / (this.total - 2));
		// 각 좌표의 x값을 띄울 때 간격을 (스테이지 넓이/포인트 수)보다 넓게 정의해서 양이 화면 밖에서부터 걸어올 수 있도록 함 

		for(let i=0; i<this.total; i++) {
			this.points[i] = {
				x: i * this.gap,
				y: this.getY()
			};
		}
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();

		let cur = this.points[0];
		let prev = cur;

		let dots = []; // 양의 좌표를 찾기 위해 저장해두는 곡선의 좌표 배열 
		cur.x += this.speed; // 그려질 때 스피드 더하기  

		// 언덕의 x좌표의 시작점이 화면 밖으로 나오기 전에 새로운 언덕을 배열 앞에 추가 
		// 화면 일정 영역 이상에서 사라지면 배열에서 삭제 
		if(cur.x > -this.gap) {
			this.points.unshift({
				x: -(this.gap * 2),
				y: this.getY()
			});
		} else if (cur.x > this.stageWidth + this.gap) {
			this.points.splice(-1);
		}



		ctx.moveTo(cur.x, cur.y);

		let prevCx = cur.x;
		let prevCy = cur.y;

		for(let i=1; i<this.points.length; i++) {
			cur = this.points[i];
			cur.x += this.speed; // 그려질 때 스피드 더하기 
			const cx = (prev.x + cur.x) / 2;
			const cy = (prev.y + cur.y) / 2;
			ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

			dots.push({
				x1: prevCx,
				y1: prevCy,
				x2: prev.x,
				y2: prev.y,
				x3: cx,
				y3: cy 
			});

			prev = cur;
			prevCx = cx;
			prevCy = cy;
		}

		ctx.lineTo(prev.x, prev.y);
		ctx.lineTo(this.stageWidth, this.stageHeight);
		ctx.lineTo(this.points[0].x, this.stageHeight);
		ctx.fill();

		return dots;
	} 

	getY() {
		const min = this.stageHeight / 8;
		const max = this.stageHeight - min;
		return min + Math.random() * max;
	}
}