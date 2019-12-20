describe('Follow link to tag page', () => {
	it('Visits a tag page from the root', () => {
		cy.visit('/')
		cy.contains("[data-test='tag-list-link']", 'CSS').click()
		cy.get('h1').contains('Tag: CSS')

		// find at least two post links
		cy.get("[data-test='post-list-link']").its('length').should('be.gte', 2)

		// click another tag link
		cy.contains("[data-test='tag-list-link']", 'Motor impairment').click()
		cy.get('h1').contains('Tag: Motor impairment')

		// find one post link
		cy.get("[data-test='post-list-link']").its('length').should('eq', 1)

	})
})
