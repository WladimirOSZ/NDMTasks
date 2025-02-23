import { gql } from '@apollo/client'

const CREATE_ITEM = gql`
  mutation updateItem(
    $id: ID!
    $name: String!
    $description: String
    $status: Status
  ){
    updateItem(input: { id: $id, name: $name, description: $description, status: $status }) {
      id
      name
      status
      description
    }
  }
`

export default CREATE_ITEM
