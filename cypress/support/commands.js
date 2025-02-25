Cypress.Commands.add('visitHomePage', () => {
  cy.visit('http://localhost:5173')
})

Cypress.Commands.add('verifyHomePageTitles', () => {
  cy.get('h1').contains('NDMTasks').should('exist')
  cy.get('h1').contains('- Home').should('exist')
  cy.get('h3').contains('The best to-do list you need.').should('exist')
})

Cypress.Commands.add('interceptEmptyTasks', () => {
  cy.intercept('POST', 'http://localhost:3000/graphql', (req) => {
    if (req.body.operationName === 'GetItemsByStatus') {
      req.reply({ data: { getItemsByStatus: [] } })
    }
  })
})

Cypress.Commands.add('createTask', (title, description) => {
  cy.contains('Add task').click()
  cy.get('[data-cy="title-input"]').type(title)
  if (description) cy.get('[data-cy="description-input"]').type(description)
  cy.get('button').contains('Create Task').click()
})

Cypress.Commands.add('performTaskAction', (action) => {
  cy.get("[aria-label='more']").first().click()
  cy.contains(action).click()
})

Cypress.Commands.add('selectFilter', (filterName) => {
  cy.get('[data-testid="filter-select"]').click()
  cy.get('[role="option"]').contains(filterName).click()
})