import { gql } from '@apollo/client'

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
