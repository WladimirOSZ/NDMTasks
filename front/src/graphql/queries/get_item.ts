import { gql } from '@apollo/client'

export type GetItemDetails = {
  getItem: {
    createdAt: string
    updatedAt: string
  }
}

const GET_ITEM = gql`
  query GetItem ($id: ID!, $listToken: String!) {
    getItem (id: $id, listToken: $listToken) {
      createdAt
      updatedAt
    }
  }
`

export default GET_ITEM
