class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.string :subtitle
      t.string :description
      t.datetime :start_date
      t.datetime :end_date
      t.string :image
      t.integer :comments_count, default: 0, null: false
      t.integer :likes_count, default: 0, null: false
      t.references :user, index: true
      t.timestamps null: false
    end
  end
end
