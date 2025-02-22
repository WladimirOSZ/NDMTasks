require 'rails_helper'

RSpec.describe 'Delete item mutation', type: :request do
  let(:query) do
    <<~GQL
    mutation($id: ID!) {
      deleteItem(input: {
        id: $id
      }) {
        id
        name
        status
        description
      }
    }
    GQL
  end

  context 'delete a existing item' do
    it 'deletes with success' do
      item = create(:item)
      variables = { id: item.id }

      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)
      data = json['data']['deleteItem']

      expect(data).to include(
        'name' => item.name,
        'description' => item.description,
        'status' => item.status
      )
    end
  end

  context 'deleting an item that does not exist' do
    it 'returns an error' do
      variables = { id: 0 }

      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end
end
