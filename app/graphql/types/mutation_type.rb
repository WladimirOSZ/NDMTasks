# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_item, mutation: Mutations::CreateItem
    field :update_item, mutation: Mutations::UpdateItem
    field :delete_item, mutation: Mutations::DeleteItem
    field :complete_item, mutation: Mutations::CompleteItem
    field :create_list, mutation: Mutations::CreateList
  end
end
