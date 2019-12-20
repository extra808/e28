<template>
	<div class='posts-list'>
		<h1 v-if='tag != null'>Tag: {{ titleTag }}</h1>
		<ul>
			<li v-for='post in posts' :key='post.id'>
				<router-link
					data-test='post-list-link'
					:to='{ name: "post", params: {"path": path, "id": post.id, "slug": post.slug } }'
				>{{ post.title }}</router-link>
			</li>
		</ul>
		<tags-list v-if='tag != null' :path='path' :tags='tags' />
	</div>
</template>

<script>
import TagsList from './TagsList.vue';

export default {
	name: 'PostsList',
	components: { TagsList },
	data: function() {
		return {};
	},
	props: ['tag'],
	computed: {
		path() {
			return this.$store.getters.getPath;
		},
		posts() {
			if (this.tag) {
				return this.$store.getters.getPostsIndex.filter(post =>
					post.tags.includes(this.titleTag)
				);
			} else {
				return this.$store.getters.getPostsIndex;
			}
		},
		tags() {
			const allTags = this.$store.getters.getAllTags;
			return allTags.sort();
		},
		titleTag() {
			return this.$store.getters.getAllTags.find(
				tag => this.tag == tag.toLowerCase()
			);
		}
	},
	mounted() {
		this.$store.dispatch('setPostData');
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
