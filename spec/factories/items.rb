FactoryBot.define do
  factory :item do
    name { Faker::Book.title }
    description { Faker::Lorem.sentence }
    status { :pending }

    trait :complete do
      status { :complete }
    end
  end
end
