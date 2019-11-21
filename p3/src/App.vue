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
*,
*::before,
*::after {
	box-sizing: border-box;
}

#app {
	font-family: sans-serif;
	font-size: calc(16px + 6 * ((100vw - 320px) / 680));
}
[v-cloak] {
	display: none;
}

button {
	border: 0;
	border-radius: 0.3rem;
	padding: 0.1em 0.5em;
	margin: 0;
	text-decoration: none;
	background: hsl(0, 0%, 82%);
	font-size: 1rem;
	cursor: pointer;
	text-align: center;
	transition: background 250ms ease-in-out, transform 150ms ease;
	-webkit-appearance: none;
	-moz-appearance: none;
}

button:hover,
button:focus {
	background: hsl(0, 0%, 46%);
}

button:focus {
	outline: 1px solid #fff;
	outline-offset: -4px;
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
}
</style>
