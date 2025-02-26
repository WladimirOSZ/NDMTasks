import { render, screen, waitFor } from '@testing-library/react'
import HomePage from '../../pages/HomePage'
import { MockedProvider } from '@apollo/client/testing'
import { emptyMock, listMock, tasksMock } from '../mocks/graphqlMocks'

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ token: 'MOCK1' }),
  useNavigate: jest.fn().mockReturnValue(() => { }),
}))

describe('ListPage', () => {
  describe('display the name of the list', () => {
    test('renders the list name', () => {
      render(
        <MockedProvider mocks={[emptyMock, listMock]}>
          <HomePage />
        </MockedProvider>
      )

      const listName = screen.findByText('Test Name')

      waitFor(() => {
        expect(listName).toBeInTheDocument()
      })
    })
  })

  describe('when loading tasks', () => {
    test('renders skeleton', () => {
      render(
        <MockedProvider mocks={[emptyMock, listMock]}>
          <HomePage />
        </MockedProvider>
      )

      const skeleton = screen.findAllByTestId('skeleton')

      waitFor(() => {
        expect(skeleton).toHaveLength(4)
      })
    })
  })


  describe('when there are no tasks', () => {
    describe('and filter is all', () => {
      test('renders "No tasks yet" message', () => {
        render(
          <MockedProvider mocks={[emptyMock, listMock]}>
            <HomePage />
          </MockedProvider>
        )

        const noTasks = screen.findByText('No tasks yet. Create one!')

        waitFor(() => {
          expect(noTasks).toBeInTheDocument()
        })
      })
    })
  })

  describe('when there are tasks', () => {
    test('renders tasks', () => {
      render(
        <MockedProvider mocks={[tasksMock, listMock]} addTypename={false}>
          <HomePage />
        </MockedProvider>
      )

      const firstTask = screen.findByText('First Item')
      const fourthTask = screen.findByText('Fourth Item')

      waitFor(async () => {
        expect(firstTask).toBeInTheDocument()
        expect(fourthTask).toBeInTheDocument()
      })
    })
  })
})
