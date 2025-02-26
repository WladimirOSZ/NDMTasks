describe('HomePage', () => {
  beforeEach(() => {
    cy.visitHomePage()
  })

  it('Display HomePage title and subtitle', () => {
    cy.get('h1').contains('NDMTasks').should('exist')
    cy.get('h1').contains('- Home').should('exist')
    cy.get('h3').contains('The best to-do list you need.').should('exist')
  })

  context('With no lists', () => {
    it('Display text saying to create a list', () => {
      cy.contains('p', 'Create a new list to start adding tasks.').should('exist')
    })
  })

  context('List creation', () => {
    it('Successfully create a list', () => {
      cy.createList('Test list')
      cy.get('h3').contains('List - Test list').should('exist')
    })

    it('Fails to create a list with an empty title', () => {
      cy.contains('Create a new list').click()
      cy.get('button').contains('Create List').click()
      cy.contains('p', 'Title is a required field').should('exist')
    })
  })
})
