<template>
	<div id='app' v-cloak>
		<header>
			<h1 class='site-title' v-if='this.$route.name == "home"'>
				<router-link :to='{name: "home"}'>Accessibility Techniques</router-link>
			</h1>
			<div class='site-title' v-else>
				<router-link :to='{name: "home"}'>Accessibility Techniques</router-link>
			</div>
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
:root {
	--head-foot-bg: hsla(200, 50%, 70%, 1);
	--button-hover-bg: hsla(200, 50%, 70%, 0.5);
	--primary-color: blue;
}

*,
*::before,
*::after {
	box-sizing: border-box;
}

html {
	height: 100%;
}

body {
	margin: 0;
	height: 100%;
}

#app {
	border-left: 1px solid var(--primary-color);
	border-right: 1px solid var(--primary-color);
	display: flex;
	flex-direction: column;
	font-family: sans-serif;
	font-size: calc(16px + 6 * ((100vw - 320px) / 680));
	height: 100%;
	margin: 0 auto;
	max-width: 60rem;
}

[v-cloak] {
	display: none;
}

#app > header {
	background-color: var(--head-foot-bg);
	border-bottom: 1px solid var(--primary-color);
	padding: 0.5em;
}

.visually-hidden {
	position: absolute;
	top: auto;
	overflow: hidden;
	clip: rect(1px 1px 1px 1px);
	/* IE 6/7 */
	clip: rect(1px, 1px, 1px, 1px);
	width: 1px;
	height: 1px;
	white-space: nowrap;
}
.site-title {
	font-family: serif;
	font-size: calc(28px + 4 * ((100vw - 320px) / 680));
	font-weight: 700;
	margin: 1em 0;
}

.site-title a,
.site-title a:visited {
	color: var(--primary-color);
	text-decoration: none;
}

.site-title a:hover {
	text-decoration: underline;
}

/* div.page-flex {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
} */
</style>
