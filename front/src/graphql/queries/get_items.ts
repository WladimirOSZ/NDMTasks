import { gql } from '@apollo/client'
import { Item } from '../../types/ItemsTypes'

export type GetItems = {
  getItems: Item[]
}

const GET_ITEMS = gql`
  query GetItems {
    getItems {
      id
      name
      status
      description
    }
  }
`

export default GET_ITEMS
