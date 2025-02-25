class AddNameToList < ActiveRecord::Migration[8.0]
  def change
    add_column :lists, :name, :string
  end
end
