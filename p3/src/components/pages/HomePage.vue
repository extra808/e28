<template>
	<main>
		<p>Home Page</p>
		<posts-list></posts-list>
	</main>
</template>

<script>
import PostsList from './../PostsList.vue';

export default {
	name: 'HomePage',
	components: { PostsList }
};
</script>
