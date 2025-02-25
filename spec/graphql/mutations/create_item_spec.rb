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
  let(:list) { create(:list) }

  context 'with valid parameters' do
    describe 'with pending status' do
      let(:variables) do
        {
          input: {
            name: "Item Name",
            description: "description",
            status: 'pending',
            listToken: list.token
          }
        }
      end

      it 'create a item' do
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

    describe 'with completed status' do
      let(:variables) do
        {
          input: {
            name: "Item Name",
            status: 'completed',
            listToken: list.token
          }
        }
      end

      it 'create a item' do
        post '/graphql', params: { query: query, variables: variables }
        json = JSON.parse(response.body)
        data = json['data']['createItem']

        expect(data).to include(
          'name' => 'Item Name',
          'status' => 'completed'
        )
      end
    end
  end

  context 'with invalid parameters' do
    context 'without name' do
    it 'return errors' do
      variables = { status: 'pending', listToken: list.token }
      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end

    context 'without list token' do
      it 'return errors' do
        variables = { input: { name: 'Item Name', status: 'pending' } }
        post '/graphql', params: { query: query, variables: variables }
        json = JSON.parse(response.body)

        expect(json['errors']).not_to be_empty
      end
    end
  end
end
