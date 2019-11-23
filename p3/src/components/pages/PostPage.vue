<template>
	<div class='page' :class='{"is-offline": offline}'>
		<offline-toggle :slug='slug' :post='post' />
		<tags-list :aclass='"page"' />
		<div class='page-flex'>
			<article>
				<h1>
					{{ post.title }}
					<span class='is-offline' v-show='offline'>[Saved Offline]</span>
				</h1>
				<div v-html='post.body' class='post-body'></div>
			</article>
		</div>
	</div>
</template>

<script>
import * as app from './../../app.js';
import OfflineToggle from './../OfflineToggle.vue';
import TagsList from './../TagsList.vue';

export default {
	name: 'PostPage',
	components: { OfflineToggle, TagsList },
	props: ['id', 'path', 'slug'],
	data: function() {
		return {
			errored: false,
			offline: false,
			post: {}
		};
	},
	watch: {
		errored: function() {
			// attempt to retrieve post from localStorage
			this.post = JSON.parse(localStorage.getItem(this.slug));
			if (this.post === null) {
				this.post = { title: 'Post not saved offline', body: '' };
			} else {
				this.offline = true;
			}
		}
	},
	mounted() {
		app.axios
			.get(app.config.api)
			.then(response => {
				this.post = response.data.posts[this.id];
				const postIndex = response.data.posts_index[this.id];
				this.$root.$emit('taglist', { path: this.path, tags: postIndex.tags });
				this.errored = false;
			})
			.catch(error => {
				console.log(error);
				this.errored = true;
			})
			.finally(function() {
				// always executed
			});
	}
};
</script>

<style scoped>
article {
	max-width: 75ch;
	padding: 0 0.5em;
}

.is-offline h1 span {
	font-size: 1rem;
	font-style: italic;
}

.is-offline article {
	background-color: hsla(200, 0%, 0%, 0.1);
}
</style>

// scoped styles don't appear to work on HTML rendered by v-html
<style>
.post-body img {
	max-width: 100%;
	object-fit: scale-down;
}

.post-body pre {
	border: 1px solid gray;
	overflow-x: scroll;
	padding-bottom: 1em;
}

.post-body pre code {
}
</style>
