describe('Home Page', () => {
	it('Visits the app root url', () => {
		cy.visit('/')
		cy.contains('h1', 'Accessibility Techniques')

		// find at least two post links
		cy.get("[data-test='post-list-link']").its('length').should('be.gte', 2)
	})
})
