class CreateGalleries < ActiveRecord::Migration
  def change
    create_table :galleries do |t|
      t.string :photo
      t.integer :comments_count, default: 0
      t.integer :likes_count, default: 0
      t.string :description
      t.timestamps null: false
    end
  end
end
