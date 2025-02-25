import { gql } from '@apollo/client'

export type GetItemDetails = {
  getItem: {
    createdAt: string
    updatedAt: string
  }
}

const GET_ITEM = gql`
  query GetItem ($id: ID!, $token: String!) {
    getItem (id: $id, token: $token) {
      createdAt
      updatedAt
    }
  }
`

export default GET_ITEM
