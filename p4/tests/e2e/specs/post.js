describe('Post page', () => {
	it('Visits a post page from the root', () => {
		cy.visit('/')
		// click the second post link
		cy.get("[data-test='post-list-link']").eq(1).click()
		cy.contains('h1', 'Technique')

		// save post offline
		cy.contains('Save Offline').click()
	})
})
