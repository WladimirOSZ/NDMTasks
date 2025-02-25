require 'rails_helper'

RSpec.describe 'Get item by status', type: :request do
  let(:query) do
    <<~GQL
    query ($status: Status, $listToken: String!) {
      getItemsByStatus(status: $status, listToken: $listToken) {
        id
        name
        status
        description
      }
    }
    GQL
  end
  let(:list) { create(:list) }

  context 'Get items filtered by status' do
    context 'with success' do
      it 'with pending status' do
        create_list(:item, 5, status: 'pending', list: list)
        create_list(:item, 3, status: 'completed', list: list)

        variables = { status: 'pending', listToken: list.token }
        post '/graphql', params: { query: query, variables: variables }
        json = JSON.parse(response.body)
        data = json['data']['getItemsByStatus']

        expect(data.size).to eq(5)
        expect(data.first['status']).to eq('pending')
      end

      it 'with completed status' do
        create_list(:item, 5, status: 'pending', list: list)
        create_list(:item, 3, status: 'completed', list: list)

        variables = { status: 'completed', listToken: list.token }
        post '/graphql', params: { query: query, variables: variables }
        json = JSON.parse(response.body)
        data = json['data']['getItemsByStatus']

        expect(data.size).to eq(3)
        expect(data.first['status']).to eq('completed')
      end

      it 'without status returns all items' do
        create_list(:item, 5, status: 'pending', list: list)
        create_list(:item, 3, status: 'completed', list: list)

        post '/graphql', params: { query: query, variables: { listToken: list.token } }
        json = JSON.parse(response.body)
        data = json['data']['getItemsByStatus']

        expect(data.size).to eq(8)
      end
    end

    context 'when no items are found' do
      it 'returns an empty list' do
        create_list(:item, 5, status: 'completed', list: list)

        variables = { status: 'pending', listToken: list.token }
        post '/graphql', params: { query: query, variables: { status: 'pending', listToken: list.token } }
        json = JSON.parse(response.body)
        data = json['data']['getItemsByStatus']

        expect(data).to be_empty
      end
    end

    context 'with errors' do
      context 'when the status is invalid' do
        it 'returns an error message' do
          variables = { status: 'invalid', listToken: list.token }
          post '/graphql', params: { query: query, variables: variables }
          json = JSON.parse(response.body)
          error = json['errors'].first

          expect(error['message']).to eq('Variable $status of type Status was provided invalid value')
        end
      end

      context 'when the list does not exist' do
        it 'returns an error message' do
          variables = { status: 'pending', listToken: 'invalid' }
          post '/graphql', params: { query: query, variables: variables }
          json = JSON.parse(response.body)
          error = json['errors'].first

          expect(error['message']).to eq('List not found.')
        end
      end
    end
  end
end
