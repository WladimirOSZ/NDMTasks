import { render, screen } from '@testing-library/react'
import { NoItems } from '../../components/NoItems'


describe('NoTask', () => {
  test('displays no tasks yet when there are no tasks', () => {
    render(
      <NoItems setIsModalOpen={() => { }} statusFilter='all' />
    )

    const message = screen.getByText('No tasks yet. Create one!')

    expect(message).toBeInTheDocument()
  })

  test('displays no pending tasks when there are no pending tasks', () => {
    render(
      <NoItems setIsModalOpen={() => { }} statusFilter='pending' />
    )

    const message = screen.getByText('No pending tasks. Well done!')

    expect(message).toBeInTheDocument()
  })

  test('displays no completed tasks when there are no completed tasks', () => {
    render(
      <NoItems setIsModalOpen={() => { }} statusFilter='completed' />
    )

    const message = screen.getByText('No completed tasks. Keep going!')

    expect(message).toBeInTheDocument()
  })
})
