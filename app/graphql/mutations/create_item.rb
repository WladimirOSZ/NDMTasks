
module Mutations
  class CreateItem < BaseMutation
    argument :name, String, required: true
    argument :description, String, required: false
    argument :status, Types::StatusType, required: false

    type Types::ItemType

    def resolve(name:, description: nil, status: nil)
      Item.create!(
        name: name,
        description: description,
        status: status
      )
    end
  end
end
