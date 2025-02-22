# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :get_items, [ Types::ItemType ], null: false

    field :get_item, Types::ItemType, null: false do
      argument :id, ID, required: true
    end

    field :get_items_by_status, [ Types::ItemType ], null: false do
      argument :status, Types::StatusType, required: true
    end

    def get_items
      Item.all.order(created_at: :desc)
    end

    def get_item(id:)
      Item.find(id)
    rescue ActiveRecord::RecordNotFound
      GraphQL::ExecutionError.new("Item not found.")
    end

    def get_items_by_status(status:)
      Item.where(status: status)
    end
  end
end
