FactoryBot.define do
  factory :item do
    name { Faker::Book.title }
    description { Faker::Lorem.sentence }
    status { :pending }

    trait :done do
      status { :done }
    end
  end
end
