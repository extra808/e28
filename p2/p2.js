
Vue.component('score-board', {
	data: function () {
		return {}
	},
	props: { 'board-score': Number },
	template: '#score_board'
});

Vue.component('board-wall', {
	data: function () {
		return {}
	},
	template: '#board-wall'
});

Vue.component('a-skeeto', {
	data: function () {
		return {
			classes: 'fly skeeto',
			skeetoHit: '',
			maxHeight: 85,
			maxTranslateHeight: 300,
			styles: ''
		}
	},
	computed: {
		skeetoStyles: function () {
			const randHeight = random(this.maxHeight);
			let translateHeight = 0;

			// translate up or down, depending on ending height
			if (randHeight <= this.maxHeight / 2) {
				translateHeight = random(this.maxTranslateHeight);
			}
			else {
				translateHeight = - random(this.maxTranslateHeight);
			}

			const end = '--skeeto-end-height: ' + randHeight + '%; ';
			const start = '--skeeto-start-height: ' + translateHeight + '%; ';

			return end + start;
		}
	},
	mounted: function () {
		this.disableSkeeto = '';
		// need a delay before removing the class otherwise the CSS transition doesn't occur
		setTimeout(() => this.classes = 'skeeto', 1);
	},
	template: '#a-skeeto'
});

Vue.component('laser-area', {
	data: function () {
		return {
			laserEndX: 0,
			laserEndY: 0,
			laserStyles: '',
			svgStartX: '0',
			svgStartY: '0',
			svgEndX: '320',
			svgEndY: '320',
			svgTop: 0
		}
	},
	props: ['target-clickx', 'target-clicky'],
	computed: {
		laserChange: function () {
			// recompute to trigger watch when either value changes
			return this.laserEndX || this.laserEndY;
		},
		svgCenterX: function () {
			return this.svgEndX == 0 ? 0 : this.svgEndX / 2;
		},
		svgCircleR: function () {
			return this.svgEndY / 10;
		},
		svgViewbox: function () {
			return this.svgStartX + ' ' + this.svgStartY + ' ' + this.svgEndX + ' ' + this.svgEndY;
		}
	},
	watch: {
		laserChange: function () {
			this.changeClass('styles');
			setTimeout(() => this.changeClass(''), 64);
		},
		targetClickx: function () {
			this.laserEndX = this.targetClickx;
		},
		targetClicky: function () {
			this.laserEndY = this.targetClicky - this.svgTop;
		}
	},
	methods: {
		changeClass: function (laserClass) {
			this.laserStyles = laserClass;
		},
		clickEvent: function (amount, event) {
			this.$root.changeScore({ amount: amount, event: event });
		}
	},
	mounted: function () {
		this.svgStartX = this.$el.clientTop;
		this.svgStartY = this.$el.clientLeft;
		this.svgEndX = this.$el.clientWidth;
		this.svgEndY = this.$el.clientHeight;
		this.svgTop = this.$el.getBoundingClientRect().top;
	},
	template: '#laser-area'
});

var app = new Vue({
	el: '#app',
	data: {
		difficulties: { 'Hard': { 'speed': '4000' } },
		difficulty: 'Hard',
		gameRunning: 0,
		gameScore: 0,
		lastClickX: 0,
		lastClickY: 0,
		skeetoStart: false
	},
	computed: {
		appStyles: function () {
			return '--skeeto-speed: ' + this.difficulties[this.difficulty].speed + 'ms';
		}
	},
	watch: {
		gameScore: function () {
			if (this.gameScore >= 10 || this.gameScore <= -10) {
				this.endGame(this.gameScore);
			}
		}
	},
	methods: {
		changeScore: function (clickObject) {
			if (this.gameRunning != 0) {
				this.gameScore += clickObject.amount;
				this.lastClickX = clickObject.event.clientX;
				this.lastClickY = clickObject.event.clientY;
			}
		},
		endGame: function (score) {
			this.skeetoStart = false;
			clearInterval(this.gameRunning);
			this.gameRunning = 0;
			if (score > 0) {
				alert('Great zapping!');
			}
			else {
				alert('Keep practicing your zapping!');
			}
		},
		newGame: function () {
			this.gameScore = 0;
			const skeetoSpeed = this.difficulties[this.difficulty].speed;
			this.gameRunning = setInterval(() => this.restartSkeeto(skeetoSpeed), 6000);
		},
		restartSkeeto: function (speed) {
			this.skeetoStart = true;
			setTimeout(() => this.skeetoStart = false, speed);
		}
	}
});

function random(max) {
	return Math.floor(Math.random() * max);
}
