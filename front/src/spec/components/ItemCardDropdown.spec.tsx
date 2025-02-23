import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ItemCardDropdown from '../../components/ItemCard/ItemCardDropdown'
import { createItem } from '../mocks/itemMocks'

jest.mock('@apollo/client', () => ({
  useMutation: jest.fn(() => [jest.fn(), {}]),
  useQuery: jest.fn(() => ({})),
  gql: jest.fn((str) => str),
}))
const refetchMock = jest.fn()

describe('ItemCardDropdown', () => {
  describe('Menu items presence', () => {
    test('does not render the dropdown items when closed', () => {
      const item = createItem({})
      render(
        <ItemCardDropdown item={item} refetch={refetchMock} />
      )

      const detailsButton = screen.queryByText('Details')
      const editButton = screen.queryByText('Edit')
      const completeButton = screen.queryByText('Complete')
      const deleteButton = screen.queryByText('Delete')

      expect(detailsButton).toBeNull()
      expect(editButton).toBeNull()
      expect(completeButton).toBeNull()
      expect(deleteButton).toBeNull()
    })

    test('renders the dropdown items whe open', () => {
      const item = createItem({})
      render(
        <ItemCardDropdown item={item} refetch={refetchMock} />
      )

      const moreButton = screen.getByRole('button', { name: /more/i })
      fireEvent.click(moreButton)

      const detailsButton = screen.getByText('Details')
      const editButton = screen.getByText('Edit')
      const completeButton = screen.getByText('Complete')
      const deleteButton = screen.getByText('Delete')

      expect(detailsButton).toBeInTheDocument()
      expect(editButton).toBeInTheDocument()
      expect(completeButton).toBeInTheDocument()
      expect(deleteButton).toBeInTheDocument()
    })

    test('renders the dropdown without complete button when item is completed', () => {
      const item = createItem({ status: 'completed' })
      render(
        <ItemCardDropdown item={item} refetch={refetchMock} />
      )

      const moreButton = screen.getByRole('button', { name: /more/i })
      fireEvent.click(moreButton)

      const detailsButton = screen.getByText('Details')
      const editButton = screen.getByText('Edit')
      const completeButton = screen.queryByText('Complete')
      const deleteButton = screen.getByText('Delete')

      expect(detailsButton).toBeInTheDocument()
      expect(editButton).toBeInTheDocument()
      expect(completeButton).toBeNull()
      expect(deleteButton).toBeInTheDocument()
    })
  })

  describe('Menu items actions', () => {
    test('opens details modal when details is clicked', async () => {
      const item = createItem({})
      render(<ItemCardDropdown item={item} refetch={refetchMock} />)

      fireEvent.click(screen.getByRole('button', { name: /more/i }))
      fireEvent.click(screen.getByText('Details'))

      await screen.findByTestId('item-details-modal')
    })

    test('opens edit modal when edit is clicked', async () => {
      const item = createItem({})
      render(<ItemCardDropdown item={item} refetch={refetchMock} />)

      fireEvent.click(screen.getByRole('button', { name: /more/i }))
      fireEvent.click(screen.getByText('Edit'))

      await screen.findByTestId('item-form-modal')
      await waitFor(() => {
        screen.findByText('Update Task')
      })
    })

    test('calls complete item and refetch when complete is clicked', async () => {
      const mockCompleteItem = jest.fn()
      const mockUseMutation = jest.fn(() => [
        mockCompleteItem,
        { loading: false, error: undefined },
      ])
      jest.mock('@apollo/client', () => ({
        useMutation: mockUseMutation,
        useQuery: jest.fn(() => ({})),
        gql: jest.fn((str) => str),
      }))
      const item = createItem({})

      render(<ItemCardDropdown item={item} refetch={refetchMock} />)
      fireEvent.click(screen.getByRole('button', { name: /more/i }))
      fireEvent.click(screen.getByText('Complete'))

      waitFor(() => {
        expect(mockCompleteItem).toHaveBeenCalled()
        expect(refetchMock).toHaveBeenCalled()
      })
    })

    test('calls delete item when delete is clicked', async () => {
      const mockDeleteItem = jest.fn()
      const mockUseMutation = jest.fn(() => [
        mockDeleteItem,
        { loading: false, error: undefined },
      ])
      jest.mock('@apollo/client', () => ({
        useMutation: mockUseMutation,
        useQuery: jest.fn(() => ({})),
        gql: jest.fn((str) => str),
      }))
      const item = createItem({})

      render(<ItemCardDropdown item={item} refetch={refetchMock} />)
      fireEvent.click(screen.getByRole('button', { name: /more/i }))
      fireEvent.click(screen.getByText('Delete'))

      waitFor(() => {
        expect(mockDeleteItem).toHaveBeenCalled()
      })
    })
  })
})
