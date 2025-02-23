import COMPLETE_ITEM from "../../../graphql/mutations/complete_item"
import DELETE_ITEM from "../../../graphql/mutations/delete_item"

export const deleteMock = {
  request: {
    query: DELETE_ITEM,
    variables: { id: 1 }
  },
  result: { data: { deleteItem: {} } }
}

export const completeMock = {
  request: {
    query: COMPLETE_ITEM,
    variables: { id: 1 }
  },
  result: { data: { completeItem: {} } }
}