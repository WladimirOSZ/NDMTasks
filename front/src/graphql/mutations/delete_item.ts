import { gql } from '@apollo/client'

const DELETE_ITEM = gql`
  mutation deleteItem(
    $id: ID!
  ){
    deleteItem(input: { id: $id }) {
      id
      name
      status
      description
    }
  }
`

export default DELETE_ITEM