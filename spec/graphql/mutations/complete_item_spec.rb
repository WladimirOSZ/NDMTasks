require 'rails_helper'

RSpec.describe 'Complete item mutation', type: :request do
  let(:query) do
    <<~GQL
    mutation($id: ID!) {
      completeItem(input: {
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

  context 'complete a existing item' do
    it 'completes with success' do
      item = create(:item)
      variables = { id: item.id }

      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)
      data = json['data']['completeItem']

      expect(data).to include(
        'name' => item.name,
        'description' => item.description,
        'status' => 'completed'
      )
    end
  end

  context 'completing an item that does not exist' do
    it 'returns an error' do
      variables = { id: 0 }

      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end
end
