require 'rails_helper'

RSpec.describe 'Get item query', type: :request do
  let(:query) do
    <<~GQL
    query ($id: ID!, $listToken: String!) {
      getItem(id: $id, listToken: $listToken) {
        id
        name
        status
        description
      }
    }
    GQL
  end

  context 'Get a existing item' do
    it 'with success' do
      item = create(:item)
      variables = { id: item.id, listToken: item.list.token }

      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)
      data = json['data']['getItem']

      expect(data).to include(
        'name' => item.name,
        'description' => item.description,
        'status' => item.status
      )
    end
  end

  context 'Try to get a item that does not exist' do
    it 'returns an error' do
      variables = { id: 0, listToken: 'token' }

      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end

  context 'Try to get a item from a list that does not exist' do
    it 'returns an error' do
      item = create(:item)
      variables = { id: item.id, listToken: 'invalid' }

      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end
end
