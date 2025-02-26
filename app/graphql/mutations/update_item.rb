
module Mutations
  class UpdateItem < BaseMutation
    argument :id, ID, required: true
    argument :list_token, String, required: true
    argument :name, String, required: false
    argument :description, String, required: false
    argument :status, Types::StatusType, required: false

    type Types::ItemType

    def resolve(id:, list_token:, **attributes)
      item = List.find_by!(token: list_token).items.find(id)
      item.update!(attributes)
      item
    rescue ActiveRecord::RecordNotFound
      raise GraphQL::ExecutionError, "Item not found"
    end
  end
end
