class CreateFoods < ActiveRecord::Migration
  def change
    create_table :foods do |t|
      t.integer :category
      t.string :header
      t.string :food_description
      t.string :short_description
      t.string :image
      t.timestamps null: false
    end
  end
end
