describe('ListPage', () => {
  it('Returns to home page when token is invalid', () => {
    cy.visitListPage('invalid-token')

    cy.get('h1').contains('NDMTasks').should('exist')
    cy.get('h1').contains('- Home').should('exist')
    cy.url().should('eq', 'http://localhost:5173/')
  })

  it('Display List Name title and subtitle', () => {
    cy.visitHomePage()
    cy.createList('Test list')
    cy.get('h1').contains('NDMTasks').should('exist')
    cy.get('h1').contains('- List Page').should('exist')

    cy.get('h3').contains('List - Test list').should('exist')
  })

  context('With no tasks', () => {
    beforeEach(() => {
      cy.createList('Test list')
    })

    it('Display text saying that there are no tasks', () => {
      cy.contains('p', 'No tasks yet. Create one!').should('exist')
    })

    it('display text saying no pending tasks', () => {
      cy.selectFilter('Pending')
      cy.contains('p', 'No pending tasks. Well done!').should('exist')
    })

    it('display text saying no completed tasks', () => {
      cy.selectFilter('Completed')
      cy.contains('p', 'No completed tasks. Keep going!').should('exist')
    })
  })

  context('Task actions', () => {
    beforeEach(() => {
      cy.createList('Test list')
    })

    context('Task creation', () => {
      it('Create a task', () => {
        cy.createTask('Test task', 'Task description')
        cy.contains('h3', 'Test task').should('exist')
        cy.contains('p', 'Task description').should('exist')
      })
    })

    context('Task edition', () => {
      it('Update a task', () => {
        cy.createTask('Test task', 'Task description')
        cy.performTaskAction('Edit')
        cy.get('[data-cy="title-input"]').type('Updated task')
        cy.get('[data-cy="description-input"]').type('Updated description')
        cy.get('button').contains('Update Task').click()
        cy.contains('h3', 'Updated task').should('exist')
      })
    })

    context('Task completion', () => {
      it('Complete a task', () => {
        cy.createTask('Test task', 'Task description')
        cy.performTaskAction('Complete')
        cy.get('[data-testid="completed-icon"]').should('exist')
      })
    })

    context('Task deletion', () => {
      it('Delete a task', () => {
        cy.createTask('Test task', 'Task description')
        cy.performTaskAction('Delete')
        cy.contains('h3', 'Test task').should('not.exist')
      })
    })
  })
})
