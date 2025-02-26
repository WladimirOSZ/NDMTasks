import { gql } from '@apollo/client'

const DELETE_ITEM = gql`
  mutation deleteItem(
    $id: ID!,
    $listToken: String!
  ){
    deleteItem(input: { id: $id, listToken: $listToken }) {
      id
      name
      status
      description
    }
  }
`

export default DELETE_ITEM
