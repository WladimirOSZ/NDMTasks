require 'rails_helper'

RSpec.describe 'Get item by status', type: :request do
  let(:query) do
    <<~GQL
    query ($status: Status!) {
      getItemsByStatus(status: $status) {
        id
        name
        status
        description
      }
    }
    GQL
  end

  context 'Get items filtered by status' do
    context 'with success' do
      it 'with pending status' do
        create_list(:item, 5, status: 'pending')
        create_list(:item, 3, status: 'completed')

        post '/graphql', params: { query: query, variables: { status: 'pending' } }
        json = JSON.parse(response.body)
        data = json['data']['getItemsByStatus']

        expect(data.size).to eq(5)
        expect(data.first['status']).to eq('pending')
      end

      it 'with completed status' do
        create_list(:item, 5, status: 'pending')
        create_list(:item, 3, status: 'completed')

        post '/graphql', params: { query: query, variables: { status: 'completed' } }
        json = JSON.parse(response.body)
        data = json['data']['getItemsByStatus']

        expect(data.size).to eq(3)
        expect(data.first['status']).to eq('completed')
      end
    end

    context 'when no items are found' do
      it 'returns an empty list' do
        create_list(:item, 5, status: 'completed')

        post '/graphql', params: { query: query, variables: { status: 'pending' } }
        json = JSON.parse(response.body)
        data = json['data']['getItemsByStatus']

        expect(data).to be_empty
      end
    end

    context 'when the status is invalid' do
      it 'returns an error message' do
        post '/graphql', params: { query: query, variables: { status: 'invalid' } }
        json = JSON.parse(response.body)
        error = json['errors'].first

        expect(error['message']).to eq('Variable $status of type Status! was provided invalid value')
      end
    end
  end
end
