FactoryBot.define do
  factory :item do
    name { Faker::Book.title }
    description { Faker::Lorem.sentence }
    status { :pending }
    association :list
  end
end
