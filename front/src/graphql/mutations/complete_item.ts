import { gql } from '@apollo/client'

const COMPLETE_ITEM = gql`
  mutation completeItem(
    $id: ID!
  ){
    completeItem(input: { id: $id }) {
      id
      name
      status
      description
    }
  }
`

export default COMPLETE_ITEM