<template>
	<div id='app' v-cloak>
		<header>
			<h1 class='site-title' v-if='this.$route.name == "home"'>Accessibility Techniques</h1>
			<div class='site-title' v-else>Accessibility Techniques</div>
		</header>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {}
};
</script>

<style>
#app {
	font-family: sans-serif;
	font-size: calc(16px + 6 * ((100vw - 320px) / 680));
}
[v-cloak] {
	display: none;
}
.site-title {
	font-family: serif;
	font-size: calc(28px + 4 * ((100vw - 320px) / 680));
	font-weight: 700;
}
</style>
