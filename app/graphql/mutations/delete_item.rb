
module Mutations
  class DeleteItem < BaseMutation
    argument :id, ID, required: true

    type Types::ItemType

    def resolve(id:)
      item = Item.find(id)
      item.destroy
      item
    rescue ActiveRecord::RecordNotFound
      raise GraphQL::ExecutionError, "Item not found"
    end
  end
end
