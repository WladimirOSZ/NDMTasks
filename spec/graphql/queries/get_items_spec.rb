require 'rails_helper'

RSpec.describe 'Get items query', type: :request do
  let(:query) do
    <<~GQL
    query ($listToken: String!) {
      getItems (listToken: $listToken) {
        id
        name
        status
        description
      }
    }
    GQL
  end
  let(:list) { create(:list) }

  context 'Get a list of existing items' do
    it 'with success' do
      create_list(:item, 5, list: list)

      post '/graphql', params: { query: query, variables: { listToken: list.token } }
      json = JSON.parse(response.body)
      data = json['data']['getItems']

      expect(data.size).to eq(5)
    end

    it 'returns the correct fields' do
      create(:item, name: 'Item 1', status: 'pending', list: list)
      create(:item, name: 'Item 2', status: 'completed', created_at: 1.day.ago, list: list)

      post '/graphql', params: { query: query, variables: { listToken: list.token } }
      json = JSON.parse(response.body)
      data = json['data']['getItems']

      expect(data.first).to include(
        'name' => 'Item 1',
        'status' => 'pending'
      )
      expect(data.last).to include(
        'name' => 'Item 2',
        'status' => 'completed'
      )
    end

    it 'returns the items ordered by created_at' do
      create(:item, name: 'Older item', created_at: 2.days.ago, list: list)
      create(:item, name: 'New item', created_at: 1.day.ago, list: list)

      post '/graphql', params: { query: query, variables: { listToken: list.token } }
      json = JSON.parse(response.body)
      data = json['data']['getItems']

      expect(data.first['name']).to eq('New item')
      expect(data.last['name']).to eq('Older item')
    end
  end

  context 'when no items are found' do
    it 'returns an empty list' do
      post '/graphql', params: { query: query, variables: { listToken: list.token } }
      json = JSON.parse(response.body)
      data = json['data']['getItems']

      expect(data).to be_empty
    end
  end

  context 'when the list does not exist' do
    it 'returns an error' do
      post '/graphql', params: { query: query, variables: { listToken: 'invalid' } }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end
end
