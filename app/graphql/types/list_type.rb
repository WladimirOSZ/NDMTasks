# frozen_string_literal: true

module Types
  class ListType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :token, String
  end
end
