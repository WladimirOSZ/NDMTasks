import COMPLETE_ITEM from '../../graphql/mutations/complete_item'
import DELETE_ITEM from '../../graphql/mutations/delete_item'
import GET_ITEMS_BY_STATUS from '../../graphql/queries/get_items_by_status'
import GET_LIST from '../../graphql/queries/get_list'

const apollo = jest.requireActual('@apollo/client')

export const apolloClientMock = {
  ...apollo,
  useMutation: jest.fn(() => [jest.fn(), {}]),
  useQuery: jest.fn(() => ({})),
  gql: apollo.gql,
}

export const getItemMock = {
  request: {
    query: 'GET_ITEM',
    variables: { id: 1 }
  },
  result: {
    data: {
      item: {
        createdAt: '2025-02-23T12:40:51Z',
        updatedAt: '2025-02-23T12:40:51Z',
      }
    }
  }
}

export const deleteItemMock = {
  request: {
    query: DELETE_ITEM,
    variables: { id: 1, listToken: 'MOCK1' }
  },
  result: {
    data: {
      deleteItem: {
        id: '1',
        name: 'First Item'
      }
    }
  }
}

export const completeItemMock = {
  request: {
    query: COMPLETE_ITEM,
    variables: { id: 1 }
  },
  result: {
    data: {
      completeItem: {
        id: '1',
        name: 'First Item'
      }
    }
  }
}

export const listMock = {
  request: {
    query: GET_LIST,
  },
  result: {
    data: {
      getList: {
        name: 'Test Name'
      }
    }
  }
}

export const emptyMock = {
  request: {
    query: GET_ITEMS_BY_STATUS,
  },
  result: {
    data: {
      getItemsByStatus: [],
    },
  },
}

export const tasksMock = {
  request: {
    query: GET_ITEMS_BY_STATUS,
  },
  result: {
    data: {
      getItemsByStatus: [
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
          'status': 'completed',
          'description': 'Small description'
        },
        {
          'id': '4',
          'name': 'Fourth Item',
          'status': 'completed',
          'description': 'Small description'
        },
      ],
    },
  },
}
