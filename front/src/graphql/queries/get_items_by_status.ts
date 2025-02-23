import { gql } from '@apollo/client'
import { Item } from '../../types/ItemsTypes'

export type GetItemsByStatus = {
  getItemsByStatus: Item[]
}

const GET_ITEMS_BY_STATUS = gql`
  query GetItemsByStatus($status: Status) {
    getItemsByStatus(status: $status) {
      id
      name
      status
      description
    }
  }
`

export default GET_ITEMS_BY_STATUS
