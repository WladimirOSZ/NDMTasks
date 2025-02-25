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

    def get_items(list_token:)
      List.find_by(token: list_token).items.order(created_at: :desc)
    rescue ActiveRecord::RecordNotFound
      GraphQL::ExecutionError.new("List not found.")
    end

    def get_item(id:, list_token:)
      List.find_by(token: list_token).items.find(id)
    rescue ActiveRecord::RecordNotFound
      GraphQL::ExecutionError.new("List or Item not found.")
    end

    def get_items_by_status(status: nil, list_token:)
      if status.nil?
        return List.find_by(token: list_token).items.order(created_at: :desc)
      end
      List.find_by(token: list_token).items.where(status: status).order(created_at: :desc)
    end
  end
end
