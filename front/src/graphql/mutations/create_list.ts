import { gql } from '@apollo/client'

const CREATE_LIST = gql`
  mutation createList(
    $name: String!
  ){
    createList(input: { name: $name }) {
      id
      name
      token
    }
  }
`

export default CREATE_LIST
