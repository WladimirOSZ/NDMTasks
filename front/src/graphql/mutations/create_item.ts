import { gql } from '@apollo/client'

const CREATE_ITEM = gql`
  mutation createItem(
    $name: String!
    $description: String
    $status: Status
    $listToken: String!
  ){
    createItem(input: {
      name: $name,
      description: $description,
      status: $status
      listToken: $listToken
    }) {
      id
      name
      status
      description
    }
  }
`

export default CREATE_ITEM
