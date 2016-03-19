class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :image
      t.string :title
      t.string :subtitle
      t.string :description
      t.integer :likes_count, default: 0, null: false
      t.integer :comments_count, default: 0, null: false
      t.references :user, index: true
      t.timestamps null: false
    end
  end
end
