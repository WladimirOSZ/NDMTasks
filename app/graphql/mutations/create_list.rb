
module Mutations
  class CreateList < BaseMutation
    argument :name, String, required: true

    type Types::ListType

    def resolve(name:)
      List.create!(
        name: name
      )
    end
  end
end
