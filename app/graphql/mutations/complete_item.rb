
module Mutations
  class CompleteItem < BaseMutation
    argument :id, ID, required: true

    type Types::ItemType

    def resolve(id:)
      item = Item.find(id)
      item.completed!
      item
    rescue ActiveRecord::RecordNotFound
      raise GraphQL::ExecutionError, "Item not found"
    end
  end
end
