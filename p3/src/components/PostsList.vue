<template>
	<ul>
		<li v-for='post in posts' :key='post.id'>
			<router-link
				:to='{ name: "post", params: {"path": path, "id": post.id, "slug": post.slug } }'
			>{{ post.title }}</router-link>
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
	methods: {
		// derived from loadCategories in zipfoods
		collectTags: function(source) {
			let tags = source.map(source => source.tags);
			let mergedTags = [].concat.apply([], tags);

			// Return unique categories
			const tagList = [...new Set(mergedTags)];
			this.$root.$emit('taglist', { path: this.path, tags: tagList });
		}
	},
	mounted() {
		app.axios
			.get(app.config.api)
			.then(response => {
				this.path = response.data.path;
				this.posts = response.data.posts_index;
				this.collectTags(this.posts);
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
