import Vue from 'vue';
import ScoreBoard from './components/ScoreBoard.vue';
import BoardWall from './components/BoardWall.vue';

let app = new Vue({
	el: '#app',
	components: {
		'score-board': ScoreBoard,
		'board-wall': BoardWall
	},
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
				setTimeout(() => alert('Great zapping!'), 16);
			}
			else {
				setTimeout(() => alert('Keep practicing your zapping!'), 16);
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
