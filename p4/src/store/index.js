import Vue from 'vue'
import Vuex from 'vuex'
import * as app from './../app.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		errored: false,
		postdata: {},
		taglist: []
	},
	mutations: {
		setErrored(state, payload) {
			state.errored = payload;
		},
		setPostData(state, payload) {
			state.postdata = payload;
		},
		setTagList(state, payload) {
			// derived from loadCategories in zipfoods
			let tags = payload.map(payload => payload.tags);
			let mergedTags = [].concat.apply([], tags);

			state.taglist = [...new Set(mergedTags)];
		}
	},
	actions: {
		setPostData(context) {
			app.axios
				.get(app.config.api)
				.then(response => {
					context.commit('setErrored', false);
					context.commit('setPostData', response.data);
					context.commit('setTagList', response.data.posts_index);
				})
				.catch(error => {
					console.log(error);
					context.commit('setErrored', true);
				})
				.finally(function () {
					// always executed
				});

		}
	},
	getters: {
		getAllTags: (state) => {
			return state.taglist;
		},
		getErrored: (state) => {
			return state.errored;
		},
		getPath: (state) => {
			return state.postdata.path;
		},
		getPostById: (state) => (id) => {
			return state.postdata.posts[id];
		},
		getPostsIndex: (state) => {
			return state.postdata.posts_index;
		},
		getPostsIndexById: (state) => (id) => {
			return state.postdata.posts_index[id];
		}
	}
})
