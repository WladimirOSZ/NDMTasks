import { gql } from '@apollo/client'

export type getList = {
  getList: {
    name: string
  }
}

const GET_LIST = gql`
  query getList ($token: String!) {
    getList (token: $token) {
      name
    }
  }
`

export default GET_LIST
