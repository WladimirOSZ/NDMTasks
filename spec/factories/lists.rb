FactoryBot.define do
  factory :list do
    name { Faker::Book.title }
    token { SecureRandom.alphanumeric(5).upcase }
  end
end
