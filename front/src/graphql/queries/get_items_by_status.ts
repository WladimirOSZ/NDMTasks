import { gql } from '@apollo/client'
import { Item } from '../../types/ItemsTypes'

export type GetItemsByStatus = {
  getItemsByStatus: Item[]
}

const GET_ITEMS_BY_STATUS = gql`
  query GetItemsByStatus($status: Status, $listToken: String!) {
    getItemsByStatus(status: $status, listToken: $listToken) {
      id
      name
      status
      description
    }
  }
`

export default GET_ITEMS_BY_STATUS
