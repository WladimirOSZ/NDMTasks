class List < ApplicationRecord
  has_many :items

  before_create :generate_token

  private

  def generate_token
    self.token = SecureRandom.alphanumeric(5).upcase
  end
end
