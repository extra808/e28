import { expect } from 'chai'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'

import TagsList from '@/components/TagsList.vue'

describe('TagsList.vue', () => {
	it('renders array of tags when passed', () => {
		const path = 'techniques';
		const tags = [
			"Cognitive",
			"Attention deficit disorder",
			"Custom stylesheet",
			"Perceivable",
			"Alternatives",
			"CSS"
		];
		const wrapper = shallowMount(TagsList, {
			propsData: { path, tags },
			stubs: {
				RouterLink: RouterLinkStub
			}
		})
		expect(wrapper.text()).to.include(tags[1]);
	})
})
