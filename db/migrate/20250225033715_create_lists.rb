class CreateLists < ActiveRecord::Migration[8.0]
  def change
    create_table :lists do |t|
      t.string :token, null: false

      t.timestamps
    end
  end
end
