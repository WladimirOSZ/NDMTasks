# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :get_items, [ Types::ItemType ], null: false do
      argument :list_token, String, required: true
    end

    field :get_item, Types::ItemType, null: false do
      argument :id, ID, required: true
      argument :list_token, String, required: true
    end

    field :get_items_by_status, [ Types::ItemType ], null: false do
      argument :status, Types::StatusType, required: false
      argument :list_token, String, required: true
    end

    field :get_list, Types::ListType, null: false do
      argument :token, String, required: true
    end

    def get_items(list_token:)
      List.find_by!(token: list_token).items.order(created_at: :desc)
    rescue ActiveRecord::RecordNotFound
      GraphQL::ExecutionError.new("List not found.")
    end

    def get_item(id:, list_token:)
      list = List.find_by(token: list_token)
      return GraphQL::ExecutionError.new("List not found.") unless list

      item = list.items.find_by(id: id)
      return GraphQL::ExecutionError.new("Item not found.") unless item

      item
    end

    def get_items_by_status(status: nil, list_token:)
      list = List.find_by!(token: list_token)
      if status.nil?
        return list.items.order(created_at: :desc)
      end
      list.items.where(status: status).order(created_at: :desc)
    rescue ActiveRecord::RecordNotFound
      GraphQL::ExecutionError.new("List not found.")
    end

    def get_list(token:)
      list = List.find_by!(token: token)
      list
    rescue ActiveRecord::RecordNotFound
      GraphQL::ExecutionError.new("List not found.")
    end

  end
end
