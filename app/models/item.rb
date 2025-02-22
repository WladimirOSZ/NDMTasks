class Item < ApplicationRecord
  enum :status, pending: 0, done: 1

  validates :name, :status, presence: true
  validates :status, inclusion: { in: Item.statuses.keys }
end
