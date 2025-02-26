import { render, screen, waitFor } from '@testing-library/react'
import ItemFormModal from '../../components/ItemFormModal'

const refetchMock = jest.fn()

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(() => { }),
  useMutation: jest.fn(() => [jest.fn(), {}]),
  gql: jest.fn((str) => str),
}))
jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ token: '' }),
}))

describe('ItemFormModal', () => {
  describe('Creating a new item', () => {
    test('renders the form data', () => {
      render(
        <ItemFormModal closeModal={() => { }} refetch={refetchMock} />
      )

      const modalDescription = screen.findByText('First, create a new List')
      const title = screen.findByText('Title')

      waitFor(() => {
        expect(modalDescription).toBeInTheDocument()
        expect(title).toBeInTheDocument()
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
})
