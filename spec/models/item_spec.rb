require 'rails_helper'

RSpec.describe Item, type: :model do
  it 'is valid with valid attributes' do
    expect(build(:item)).to be_valid
  end

  it 'is not valid without a name' do
    expect(build(:item, name: nil)).to_not be_valid
  end

  it 'is not valid without a status' do
    expect(build(:item, status: nil)).to_not be_valid
  end

  it 'is not valid with a status other than pending or completed' do
    expect { build(:item, status: :invalid_status) }.to raise_error(ArgumentError)
  end

  it 'is valid with a status of pending' do
    expect(build(:item, status: :pending)).to be_valid
  end

  it 'is valid with a status of completed' do
    expect(build(:item, status: :completed)).to be_valid
  end
end
