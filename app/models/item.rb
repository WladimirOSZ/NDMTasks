class Item < ApplicationRecord
  belongs_to :list

  enum :status, pending: 0, completed: 1

  validates :name, :status, presence: true
  validates :status, inclusion: { in: Item.statuses.keys }
end
