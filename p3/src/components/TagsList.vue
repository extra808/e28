<template>
	<div>
		<ul>
			<li v-for='tag in urlTags' :key='tag.tag'>
				<router-link :to='{ name: "tag", params: {"path": path, "tag": tag.url} }'>{{ tag.tag }}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'TagsList',
	data: function() {
		return {
			path: null,
			tags: []
		};
	},
	computed: {
		urlTags: function() {
			return this.tags.map(tag => ({
				url: this.uriString(tag),
				tag: tag
			}));
		}
	},
	methods: {
		uriString: function(str) {
			return encodeURIComponent(str.toLowerCase());
		}
	},
	mounted() {
		this.$root.$on('taglist', tagList => {
			this.path = tagList.path;
			this.tags = tagList.tags.sort();
		});
	}
};
</script>
