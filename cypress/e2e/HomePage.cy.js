describe('NDMTasks - HomePage', () => {
  it('Display HomePage title and subtitle', () => {
    cy.visitHomePage()
    cy.get('h1').contains('NDMTasks').should('exist')
    cy.get('h1').contains('- Home').should('exist')
    cy.get('h3').contains('The best to-do list you need.').should('exist')
  })

  context('With no tasks', () => {
    beforeEach(() => {
      cy.interceptEmptyTasks()
      cy.visitHomePage()
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
      cy.visitHomePage()
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
        cy.performTaskAction('Edit')
        cy.get('[data-cy="title-input"]').clear().type('Updated task')
        cy.get('[data-cy="description-input"]').clear().type('Updated description')
        cy.get('button').contains('Update Task').click()
        cy.contains('h3', 'Updated task').should('exist')
      })
    })

    context('Task completion', () => {
      it('Complete a task', () => {
        cy.performTaskAction('Complete')
        cy.get('[data-testid="completed-icon"]').should('exist')
      })
    })

    context('Task deletion', () => {
      it('Delete a task', () => {
        cy.performTaskAction('Delete')
        cy.contains('h3', 'Test task').should('not.exist')
      })
    })
  })
})
