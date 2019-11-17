<template>
	<article>
		<h1>{{ post.title }}</h1>
		<div v-html='post.body' class='post-body'></div>
	</article>
</template>

<script>
import * as app from './../../app.js';

export default {
	name: 'PostPage',
	props: ['id', 'path', 'slug'],
	data: function() {
		return {
			post: {}
		};
	},
	mounted() {
		app.axios
			.get(app.config.api)
			.then(response => {
				this.post = response.data.posts[this.id];

				console.log(this.post.title);
			})
			.catch(error => {
				console.log(error);
			})
			.finally(function() {
				// always executed
			});
	}
};
</script>

// scoped styles don't appear to work on HTML rendered by v-html
<style>
.post-body img {
	max-width: 100%;
	object-fit: scale-down;
}

.post-body pre {
	overflow-x: scroll;
}
</style>
