require 'rails_helper'

RSpec.describe List, type: :model do
  it 'is valid with valid attributes' do
    expect(build(:list)).to be_valid
  end

  it 'is not valid without a name' do
    expect(build(:list, name: nil)).to_not be_valid
  end

  it 'generate a token before creation' do
    list = create(:list)
    expect(list.token).to_not be_nil
    expect(list.token.length).to eq(5)
  end
end
