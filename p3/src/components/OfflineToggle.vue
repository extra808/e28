<template>
	<div>
		<button v-if='offline' @click='clearOffline()'>
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
