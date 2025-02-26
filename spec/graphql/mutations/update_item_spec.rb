require 'rails_helper'

RSpec.describe 'Update item mutation', type: :request do
  let(:query) do
    <<~GQL
    mutation($id: ID!, $name: String, $description: String, $status: Status, $listToken: String!) {
      updateItem(input: {
        id: $id,
        name: $name,
        description: $description,
        status: $status,
        listToken: $listToken
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
    context 'with valid parameters' do
      it 'creates a item' do
        item = create(:item)
        variables = {
          id: item.id,
          name: 'Updated item Name',
          description: 'Updated description',
          status: 'completed',
          listToken: item.list.token
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
    end

    context 'with invalid data' do
      it 'without name return errors' do
        item = create(:item)
        variables = {
          id: item.id,
          name: nil,
          status: 'invalid status',
          listToken: item.list.token
        }

        post '/graphql', params: { query: query, variables: variables }, as: :json
        json = JSON.parse(response.body)

        expect(json['errors']).not_to be_empty
      end

      it 'without list token return errors' do
        item = create(:item)
        variables = {
          id: item.id,
          name: 'Updated item Name',
          status: 'completed',
          listToken: nil
        }

        post '/graphql', params: { query: query, variables: variables }, as: :json
        json = JSON.parse(response.body)

        expect(json['errors']).not_to be_empty
      end
    end
  end

  context 'updating an item that does not exist' do
    it 'returns an error' do
      variables = {
        id: 0,
        name: 'Updated item Name',
        description: 'Updated description',
        status: 'completed',
        listToken: nil
      }

      post '/graphql', params: { query: query, variables: variables }
      json = JSON.parse(response.body)

      expect(json['errors']).not_to be_empty
    end
  end
end
