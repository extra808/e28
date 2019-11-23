<template>
	<div>
		<button class='clear-offline' v-if='offline' @click='clearOffline()'>
			Clear Offline
			<span class='visually-hidden'>{{ post.title }}</span>
		</button>
		<button v-else @click='saveOffline()'>
			Save Offline
			<span class='visually-hidden'>{{ post.title }}</span>
		</button>
	</div>
</template>

<script>
export default {
	name: 'OfflineToggle',
	data: function() {
		return {
			offline: false
		};
	},
	props: ['post', 'slug'],
	methods: {
		clearOffline: function() {
			localStorage.removeItem(this.slug);
			this.offline = false;
		},
		saveOffline: function() {
			localStorage.setItem(this.slug, JSON.stringify(this.post));
			this.offline = true;
		}
	},
	mounted() {
		// check if post is in localStorage
		if (localStorage.getItem(this.slug)) {
			this.offline = true;
		}
	}
};
</script>

<style scoped>
button {
	border: 2px solid var(--primary-color);
	border-radius: 0.3rem;
	padding: 0.1em 0.5em;
	margin: 0;
	text-decoration: none;
	background: transparent;
	font-size: 1rem;
	cursor: pointer;
	margin: 0.5rem;
	text-align: center;
	transition: background 250ms ease-in-out, transform 150ms ease;
	-webkit-appearance: none;
	-moz-appearance: none;
}

button:hover,
button:focus {
	background-color: var(--button-hover-bg);
}

button:focus {
	outline: 1px solid #fff;
	outline-offset: -4px;
}

.clear-offline {
	border-color: hsl(20, 100%, 53%);
}

.clear-offline:hover,
.clear-offline:focus {
	background-color: hsla(20, 50%, 70%, 0.5);
}
</style>
