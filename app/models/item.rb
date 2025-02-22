class Item < ApplicationRecord
  enum :status, pending: 0, done: 1
end
