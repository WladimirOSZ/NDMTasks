import { gql } from '@apollo/client'

const CREATE_ITEM = gql`
  mutation createItem(
    $name: String!
    $description: String
    $status: Status
  ){
    createItem(input: { name: $name, description: $description, status: $status }) {
      id
      name
      status
      description
    }
  }
`

export default CREATE_ITEM
