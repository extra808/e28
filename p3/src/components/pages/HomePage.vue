<template>
	<main>
		<p>Home Page</p>
		<posts-list />
		<tags-list />
	</main>
</template>

<script>
import PostsList from './../PostsList.vue';
import TagsList from './../TagsList.vue';

export default {
	name: 'HomePage',
	components: { PostsList, TagsList }
};
</script>
