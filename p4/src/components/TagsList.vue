<template>
	<div class='tags' :class='aclass'>
		<h2>Tags</h2>
		<ul>
			<li v-for='(tag, id) in urlTags' :key='id'>
				<router-link :to='{ name: "tag", params: {"path": path, "tag": tag.url} }'>{{ tag.tag }}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'TagsList',
	data: function() {
		return {};
	},
	props: ['aclass', 'path', 'tags'],
	computed: {
		urlTags: function() {
			return this.tags.map(tag => ({
				url: tag.toLowerCase(),
				tag: tag
			}));
		}
	}
};
</script>

<style scoped>
div.tags {
	background-color: var(--head-foot-bg);
	border-top: 1px solid var(--primary-color);
	padding: 0.5rem;
}

h2 {
	font-size: 1.2rem;
	margin: 0;
}
ul {
	list-style: none;
	padding-left: 1em;
}

li {
	margin-bottom: 0.25em;
}

a,
a:visited {
	color: var(--primary-color);
}

div.page {
	background-color: transparent;
	border-top: 0;
	font-size: 0.9em;
}

div.page h2 {
	display: inline;
}

div.page ul {
	display: inline;
	padding-left: 0.5em;
}

div.page li {
	display: inline-block;
	margin-right: 0.5em;
}

div.page a {
	border-bottom-color: var(--primary-color);
	border-bottom-style: solid;
	border-bottom-width: 1px;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	padding: 0 0.3em;
	text-decoration: none;
}

div.page a:hover,
div.page a:focus {
	border-bottom-width: 3px;
}
</style>
