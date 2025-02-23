require 'rails_helper'

RSpec.describe 'Get items query', type: :request do
  let(:query) do
    <<~GQL
    query {
      getItems {
        id
        name
        status
        description
      }
    }
    GQL
  end

  context 'Get a list of existing items' do
    it 'with success' do
      create_list(:item, 5)

      post '/graphql', params: { query: query }
      json = JSON.parse(response.body)
      data = json['data']['getItems']

      expect(data.size).to eq(5)
    end

    it 'returns the correct fields' do
      create(:item, name: 'Item 1', status: 'pending')
      create(:item, name: 'Item 2', status: 'completed', created_at: 1.day.ago)

      post '/graphql', params: { query: query }
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
      create(:item, name: 'Older item', created_at: 2.days.ago)
      create(:item, name: 'New item', created_at: 1.day.ago)

      post '/graphql', params: { query: query }
      json = JSON.parse(response.body)
      data = json['data']['getItems']

      expect(data.first['name']).to eq('New item')
      expect(data.last['name']).to eq('Older item')
    end
  end
end
