import { render, screen, waitFor } from '@testing-library/react'
import ItemFormModal from '../../components/ItemFormModal'
import { createItem } from '../mocks/itemMocks'

const refetchMock = jest.fn()

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(() => { }),
  useMutation: jest.fn(() => [jest.fn(), {}]),
  gql: jest.fn((str) => str),
}))
jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ token: 'MOCK1' }),
}))

describe('ItemFormModal', () => {
  describe('Creating a new item', () => {
    test('renders the form data', () => {
      render(
        <ItemFormModal closeModal={() => { }} refetch={refetchMock} />
      )

      const modalDescription = screen.findByText('Create a new Task')
      const title = screen.findByText('Title')
      const description = screen.findByText('Description')
      const status = screen.findByText('Status')

      waitFor(() => {
        expect(modalDescription).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(description).toBeInTheDocument()
        expect(status).toBeInTheDocument()
      })
    })

    test('validates title', async () => {
      render(
        <ItemFormModal closeModal={() => { }} refetch={refetchMock} />
      )

      const submitButton = await screen.findByTestId('submit-button')
      submitButton.click()

      const titleError = screen.findByText('Title is required')
      waitFor(() => {
        expect(titleError).toBeInTheDocument()
      })
    })
  })

  describe('Updating an existing item', () => {
    test('renders the form data', () => {
      const item = createItem({})
      render(
        <ItemFormModal
          item={item}
          closeModal={() => { }}
          refetch={refetchMock}
        />
      )

      const modalDescription = screen.findByText('Update Task')
      const title = screen.findByText('Title')
      const description = screen.findByText('Description')
      const status = screen.findByText('Status')

      waitFor(() => {
        expect(modalDescription).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(description).toBeInTheDocument()
        expect(status).toBeInTheDocument()
      })
    })

    test('has item data pre-filled', () => {
      const item = createItem({})
      render(
        <ItemFormModal
          item={item}
          closeModal={() => { }}
          refetch={refetchMock}
        />
      )

      const title = screen.findByDisplayValue('Test Title')
      const description = screen.findByDisplayValue('Test Description')
      const status = screen.findByText('Pending')

      waitFor(() => {
        expect(title).toBeInTheDocument()
        expect(description).toBeInTheDocument()
        expect(status).toBeInTheDocument()
      })
    })
  })
})
