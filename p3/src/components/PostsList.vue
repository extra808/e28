<template>
	<div class='posts-list'>
		<h1 v-if='tag != null'>Tag: {{ titleTag }}</h1>
		<ul>
			<li v-for='post in posts' :key='post.id'>
				<router-link
					:to='{ name: "post", params: {"path": path, "id": post.id, "slug": post.slug } }'
				>{{ post.title }}</router-link>
			</li>
		</ul>
		<tags-list v-if='tag != null' />
	</div>
</template>

<script>
import * as app from './../app.js';
import TagsList from './TagsList.vue';

export default {
	name: 'PostsList',
	components: { TagsList },
	data: function() {
		return {
			path: null,
			posts: null,
			tags: []
		};
	},
	props: ['tag'],
	computed: {
		titleTag: function() {
			return this.tags.find(tag => this.tag == tag.toLowerCase());
		}
	},
	methods: {
		// derived from loadCategories in zipfoods
		collectTags: function(source) {
			let tags = source.map(source => source.tags);
			let mergedTags = [].concat.apply([], tags);

			// Return unique categories
			this.tags = [...new Set(mergedTags)];
			this.$root.$emit('taglist', { path: this.path, tags: this.tags });
		}
	},
	watch: {
		titleTag: function() {
			this.posts = this.posts.filter(post => post.tags.includes(this.titleTag));
		}
	},
	mounted() {
		app.axios
			.get(app.config.api)
			.then(response => {
				if (!this.path) {
					this.path = response.data.path;
				}
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

<style scoped>
div.posts-list {
	display: flex;
	flex-direction: column;
	height: 100%;
}
h1 {
	font-size: 1.5rem;
	padding: 0 0.5rem;
}
ul {
	flex: 1 0 auto;
	list-style: none;
	padding-left: 1em;
}

li {
	margin-bottom: 0.5em;
}
</style>
