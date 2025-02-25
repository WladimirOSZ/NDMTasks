import { gql } from '@apollo/client'

const COMPLETE_ITEM = gql`
  mutation completeItem(
    $id: ID!,
    $listToken: String!
  ){
    completeItem(input: { id: $id, listToken: $listToken }) {
      id
      name
      status
      description
    }
  }
`

export default COMPLETE_ITEM
