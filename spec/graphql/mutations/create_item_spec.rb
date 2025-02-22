require 'rails_helper'

RSpec.describe 'Create item mutation', type: :request do
  let(:query) do
    <<~GQL
    mutation CreateItem($input: CreateItemInput!) {
      createItem(input: $input) {
        id
        name
        status
        description
      }
    }
    GQL
  end

  describe 'with pending status' do
    let(:variables) do
      {
        input: {
          name: "Item Name",
          description: "description",
          status: 'pending'
        }
      }
    end

    it 'create a pending item' do
      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)
      data = json['data']['createItem']

      expect(data).to include(
        'name' => 'Item Name',
        'description' => 'description',
        'status' => 'pending'
      )
    end
  end

  describe 'with done status' do
    let(:variables) do
      {
        input: {
          name: "Item Name",
          status: 'done'
        }
      }
    end

    it 'create a done item' do
      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)
      data = json['data']['createItem']

      expect(data).to include(
        'name' => 'Item Name',
        'status' => 'done'
      )
    end
  end

  context 'with invalid parameters' do
    let(:variables) do
      {
        input: {
          status: 'pending'
        }
      }
    end

    it 'return errors' do
      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end
end
