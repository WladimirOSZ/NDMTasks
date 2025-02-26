Cypress.Commands.add('visitHomePage', () => {
  cy.visit('http://localhost:5173')
})

Cypress.Commands.add('visitListPage', (token) => {
  cy.visit('http://localhost:5173/' + token)
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

Cypress.Commands.add('createList', (title) => {
  cy.visitHomePage()
  cy.contains('Create a new list').click()
  cy.get('[data-cy="list-title-input"]').type(title)
  cy.get('button').contains('Create List').click()
})

Cypress.Commands.add('performTaskAction', (action) => {
  cy.get("[aria-label='more']").first().click()
  cy.contains(action).click()
})

Cypress.Commands.add('selectFilter', (filterName) => {
  cy.get('[data-testid="filter-select"]').click()
  cy.get('[role="option"]').contains(filterName).click()
})