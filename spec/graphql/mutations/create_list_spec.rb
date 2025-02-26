require 'rails_helper'

RSpec.describe 'Create list mutation', type: :request do
  let(:query) do
    <<~GQL
    mutation CreateList($name: String!) {
      createList(input: { name: $name} ) {
        id
        name
        token
      }
    }
    GQL
  end

  describe 'with valid parameters' do
    context 'creates the list' do
      it 'with success' do
        post '/graphql', params: { query: query, variables: { name: "Item Name" } }
        json = JSON.parse(response.body)
        data = json['data']['createList']

        expect(data).to include(
          'name' => 'Item Name',
          'token' => List.last.token
        )
      end
    end
  end

  describe 'with invalid parameters' do
    context 'without name' do
      it 'return errors' do
        variables = { name: nil }
        post '/graphql', params: { query: query, variables: variables }
        json = JSON.parse(response.body)

        expect(json['errors']).not_to be_empty
      end
    end
  end
end
