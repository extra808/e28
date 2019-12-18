<template>
	<div class='home page-flex'>
		<main>
			<p>Articles</p>
			<posts-list />
		</main>
		<aside>
			<tags-list :a-class='"home"' :path='path' :tags='tags' />
		</aside>
	</div>
</template>

<script>
import PostsList from './../PostsList.vue';
import TagsList from './../TagsList.vue';

export default {
	name: 'HomePage',
	components: { PostsList, TagsList },
	computed: {
		path: function() {
			return this.$store.getters.getPath;
		},
		tags() {
			const allTags = this.$store.getters.getAllTags;
			return allTags.sort();
		}
	},
	mounted() {
		this.$store.dispatch('setPostData');
	}
};
</script>

<style scoped>
div.home {
	display: flex;
	flex-direction: column;
	height: 100%;
}

main {
	flex: 1 0 auto;
}

main > p {
	padding: 0 0.5em;
}
aside {
	flex-shrink: 0;
}
</style>
