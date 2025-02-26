require 'rails_helper'

RSpec.describe 'Get items query', type: :request do
  let(:query) do
    <<~GQL
    query ($token: String!) {
      getList (token: $token) {
        id
        name
        token
      }
    }
    GQL
  end

  context 'Get a list' do
    it 'with success' do
      list = create(:list)
      post '/graphql', params: { query: query, variables: { token: list.token } }
      json = JSON.parse(response.body)
      data = json['data']['getList']

      expect(data).to include(
        'id' => list.id.to_s,
        'name' => list.name,
        'token' => list.token
      )
    end
  end

  context 'when no list is found' do
    it 'returns an error' do
      post '/graphql', params: { query: query, variables: { token: 'invalid' } }
      json = JSON.parse(response.body)
      error = json['errors'].first

      expect(error['message']).to eq('List not found')
    end
  end
end
