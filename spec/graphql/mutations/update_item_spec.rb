require 'rails_helper'

RSpec.describe 'Update item mutation', type: :request do
  let(:query) do
    <<~GQL
    mutation($id: ID!, $name: String, $description: String, $status: Status) {
      updateItem(input: {
        id: $id,
        name: $name,
        description: $description,
        status: $status,
      }) {
        id
        name
        status
        description
      }
    }
    GQL
  end

  context 'updating a existing item' do
    it 'updates with success' do
      item = create(:item)
      variables = {
        id: item.id,
        name: 'Updated item Name',
        description: 'Updated description',
        status: 'completed'
      }

      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)
      data = json['data']['updateItem']

      expect(data).to include(
        'name' => 'Updated item Name',
        'description' => 'Updated description',
        'status' => 'completed'
      )
    end

    it 'with invalid data' do
      item = create(:item)
      variables = {
        id: item.id,
        name: nil,
        status: 'invalid status'
      }

      post '/graphql', params: { query: query, variables: variables }, as: :json
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end

  context 'updating an item that does not exist' do
    it 'returns an error' do
      variables = {
        id: 0,
        name: 'Updated item Name',
        description: 'Updated description',
        status: 'completed'
      }

      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end
end
