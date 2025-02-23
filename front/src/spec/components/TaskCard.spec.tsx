import { render, screen } from '@testing-library/react'
import { TaskCard } from '../../components/TaskCard'

describe('TaskCard', () => {
  test('renders a task with title and description', async () => {
    render(<TaskCard title='title' description='some description' status='pending' />)
    const title = screen.getByText('title')
    const description = screen.getByText('some description')
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  test('renders pending icon when it\'s pending', async () => {
    render(<TaskCard title='title' description='some description' status='pending' />)
    const icon = screen.getByTestId('pending-icon')
    expect(icon).toBeInTheDocument()
  })

  test('renders completed icon when it\'s completed', async () => {
    render(<TaskCard title='title' description='some description' status='completed' />)
    const icon = screen.getByTestId('completed-icon')
    expect(icon).toBeInTheDocument()
  })
})
