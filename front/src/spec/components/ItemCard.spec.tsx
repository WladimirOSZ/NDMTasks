import { render, screen } from '@testing-library/react'
import { ItemCard } from '../../components/ItemCard/ItemCard'
import { Item } from '../../types/ItemsTypes'

const createItem = (overrides: Partial<Item>): Item => ({
  id: 1,
  name: 'Test Title',
  description: 'Test Description',
  status: 'pending',
  ...overrides,
})

jest.mock('@apollo/client', () => ({
  useMutation: jest.fn(() => [jest.fn(), { loading: false, error: undefined }]),
  gql: jest.fn((str) => str),
}))
const refetchMock = jest.fn()

describe('ItemCard', () => {
  test('renders a task with title and description', () => {
    const item = createItem({})
    render(
      <ItemCard item={item} refetch={refetchMock} />
    )
    const title = screen.getByText('Test Title')
    const description = screen.getByText('Test Description')
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  test('renders pending icon when it\'s pending', async () => {
    const pendingItem = createItem({ status: 'pending' })
    render(<ItemCard item={pendingItem} refetch={() => { }} />)
    const icon = screen.getByTestId('pending-icon')
    expect(icon).toBeInTheDocument()
  })

  test('renders completed icon when it\'s completed', async () => {
    const completeItem = createItem({ status: 'completed' })
    render(<ItemCard item={completeItem} refetch={() => { }} />)
    const icon = screen.getByTestId('completed-icon')
    expect(icon).toBeInTheDocument()
  })
})
