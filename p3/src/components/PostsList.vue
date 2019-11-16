<template>
	<ul>
		<li v-for='post in posts' :key='post.id'>
			<router-link :to='{ name: "post", params: {"path": path, "slug": post.slug } }'>{{ post.title }}</router-link>
		</li>
	</ul>
</template>

<script>
import * as app from './../app.js';

export default {
	name: 'PostsList',
	data: function() {
		return {
			path: null,
			posts: null
		};
	},
	mounted() {
		app.axios
			.get(app.config.api)
			.then(response => {
				this.path = response.data.path;
				this.posts = response.data.posts_index;

				console.log(this.path);
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
