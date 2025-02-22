
module Mutations
  class UpdateItem < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :description, String, required: false
    argument :status, Types::StatusType, required: false

    type Types::ItemType

    def resolve(id:, **attributes)
      item = Item.find(id)
      item.update!(attributes)
      item
    rescue ActiveRecord::RecordNotFound
      raise GraphQL::ExecutionError, "Item not found"
    end
  end
end
