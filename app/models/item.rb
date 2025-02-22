class Item < ApplicationRecord
  enum :status, pending: 0, complete: 1

  validates :name, :status, presence: true
  validates :status, inclusion: { in: Item.statuses.keys }
end
