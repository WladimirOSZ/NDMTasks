import { render, screen, waitFor } from '@testing-library/react'
import HomePage from '../../pages/HomePage'
import { MockedProvider } from '@apollo/client/testing'
import { listMock } from '../mocks/graphqlMocks'

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ token: 'MOCK1' }),
  useNavigate: jest.fn().mockReturnValue(() => { })
}))

describe('HomePage', () => {
  test('renders the page title', async () => {
    render(
      <HomePage />
    )

    const title = screen.getByText('NDMTasks')
    const subtitle = screen.getByText('The best to-do list you need.')

    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })

  describe('when there is a list token', () => {
    jest.mock('react-router', () => ({
      useParams: jest.fn().mockReturnValue({ token: 'MOCK1' }),
    }))

    test('redirects to list page', async () => {
      render(
        <MockedProvider mocks={[listMock]}>
          <HomePage />
        </MockedProvider>
      )
      const navigate = jest.fn()

      waitFor(() => {
        expect(navigate).toHaveBeenCalled()
      })
    })
  })

  describe('when there is no list token', () => {
    jest.mock('react-router', () => ({
      useParams: jest.fn().mockReturnValue({ token: '' }),
    }))

    test('stay on the page', async () => {
      render(
        <HomePage />
      )
      const navigate = jest.fn()

      waitFor(() => {
        expect(navigate).not.toHaveBeenCalled()
      })
    })
  })

  describe('when clicking on the create list button', () => {
    test('opens the modal', async () => {
      render(
        <MockedProvider mocks={[]}>
          <HomePage />
        </MockedProvider>
      )

      const createListButton = screen.getAllByText('Create a new list')[0]
      createListButton.click()

      const modalTitle = await screen.findByText('First, create a new List')

      expect(modalTitle).toBeInTheDocument()
    })
  })
})
