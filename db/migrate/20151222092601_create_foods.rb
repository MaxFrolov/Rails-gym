class CreateFoods < ActiveRecord::Migration
  def change
    create_table :foods do |t|
      t.integer :category
      t.string :title
      t.string :subtitle
      t.string :description
      t.string :image
      t.integer :likes_count, default: 0, null: false
      t.integer :comments_count, default: 0, null: false
      t.timestamps null: false
    end
  end
end
