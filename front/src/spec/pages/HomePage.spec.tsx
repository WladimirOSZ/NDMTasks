import { render, screen } from '@testing-library/react'
import HomePage from '../../pages/HomePage'
import GET_ITEMS from '../../graphql/queries/get_items'
import { MockedProvider } from '@apollo/client/testing'

const emptyMock = [
  {
    request: {
      query: GET_ITEMS,
    },
    result: {
      data: {
        getItems: [],
      },
    },
  },
]

const tasksMock = [
  {
    request: {
      query: GET_ITEMS,
    },
    result: {
      data: {
        getItems: [
          {
            'id': '1',
            'name': 'First Item',
            'status': 'pending',
            'description': 'Small description'
          },
          {
            'id': '2',
            'name': 'Second Item',
            'status': 'pending',
            'description': 'Small description'
          },
          {
            'id': '3',
            'name': 'Third Item',
            'status': 'complete',
            'description': 'Small description'
          },
          {
            'id': '4',
            'name': 'Fourth Item',
            'status': 'complete',
            'description': 'Small description'
          },
        ],
      },
    },
  },
]




describe('HomePage', () => {
  test('renders the page title', async () => {
    render(
      <MockedProvider mocks={emptyMock}>
        <HomePage />
      </MockedProvider>
    )

    const title = screen.getByText('NDMTasks')
    const subtitle = screen.getByText('The best to-do list you need.')

    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })

  describe('when loading tasks', () => {
    test('renders skeleton', () => {
      render(
        <MockedProvider mocks={emptyMock}>
          <HomePage />
        </MockedProvider>
      )

      const skeleton = screen.getAllByTestId('skeleton')

      expect(skeleton).toHaveLength(4)
    })
  })


  describe('when there are no tasks', () => {
    test('renders "No tasks yet" message', async () => {
      render(
        <MockedProvider mocks={emptyMock}>
          <HomePage />
        </MockedProvider>
      )

      const noTasks = await screen.findByText('No tasks yet.')

      expect(noTasks).toBeInTheDocument()
    })
  })

  describe('when there are tasks', () => {
    test('renders tasks', async () => {
      render(
        <MockedProvider mocks={tasksMock} addTypename={false}>
          <HomePage />
        </MockedProvider>
      )

      const firstTask = await screen.findByText('First Item')
      const fourthTask = await screen.findByText('Fourth Item')

      expect(firstTask).toBeInTheDocument()
      expect(fourthTask).toBeInTheDocument()
    })
  })
})
