# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    include RecordFinder

    field :get_items, [ Types::ItemType ], null: false, description: "Get items for a list" do
      argument :list_token, String, required: true
    end

    field :get_item, Types::ItemType, null: false, description: "Get a specific item" do
      argument :id, ID, required: true
      argument :list_token, String, required: true
    end

    field :get_items_by_status, [ Types::ItemType ], null: false, description: "Filter items" do
      argument :status, Types::StatusType, required: false
      argument :list_token, String, required: true
    end

    field :get_list, Types::ListType, null: false, description: "Get a list by token" do
      argument :token, String, required: true
    end

    def get_items(list_token:)
      list = record_finder(List, :token, list_token)
      list.items.order(created_at: :desc)
    rescue ActiveRecord::RecordNotFound => e
      raise GraphQL::ExecutionError, e.message
    end

    def get_item(id:, list_token:)
      list = record_finder(List, :token, list_token)

      record_finder(Item, :id, id)
    rescue ActiveRecord::RecordNotFound => e
      raise GraphQL::ExecutionError, e.message
    end

    def get_items_by_status(status: nil, list_token:)
      list = record_finder(List, :token, list_token)

      scope = status ? list.items.where(status: status) : list.items
      scope.order(created_at: :desc)
    rescue ActiveRecord::RecordNotFound => e
      raise GraphQL::ExecutionError, e.message
    end


    def get_list(token:)
      record_finder(List, :token, token)
    rescue ActiveRecord::RecordNotFound => e
      raise GraphQL::ExecutionError, e.message
    end
  end
end
