import { render, screen, waitFor } from '@testing-library/react'
import ItemDetailsModal from '../../components/ItemDetailsModal'
import { getItemMock } from '../mocks/graphqlMocks'
import { createItem } from '../mocks/itemMocks'

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(() => getItemMock),
  gql: jest.fn((str) => str)
}))
jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ token: 'MOCK1' }),
}))

describe('ItemDetailsModal', () => {
  test('renders item data', () => {
    const item = createItem({})
    render(
      <ItemDetailsModal item={item} closeModal={() => { }} />
    )

    const title = screen.getByText('Test Title')
    const description = screen.getByText('Test Description')
    const status = screen.getByText('Pending')
    const createdAt = screen.findByText('Created at:')
    const updatedAt = screen.findByText('Last update:')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(status).toBeInTheDocument()
    waitFor(() => {
      expect(createdAt).toBeInTheDocument()
      expect(updatedAt).toBeInTheDocument()
    })
  })
})
