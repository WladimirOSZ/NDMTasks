
module Mutations
  class DeleteItem < BaseMutation
    argument :id, ID, required: true
    argument :list_token, String, required: true

    type Types::ItemType

    def resolve(id:, list_token:)
      item = List.find_by!(token: list_token).items.find(id)
      item.destroy
      item
    rescue ActiveRecord::RecordNotFound
      raise GraphQL::ExecutionError, "Item not found"
    end
  end
end
