
module Mutations
  class CreateItem < BaseMutation
    argument :name, String, required: true
    argument :description, String, required: false
    argument :status, Types::StatusType, required: false
    argument :list_token, String, required: true

    type Types::ItemType

    def resolve(name:, description: nil, status: nil, list_token:)
      list_id = List.find_by!(token: list_token).id
      Item.create!(
        name: name,
        description: description,
        status: status,
        list_id: list_id
      )
    end
  end
end
