class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :image
      t.string :header
      t.string :short_description
      t.string :post_description
      t.datetime :post_date
      t.references :user, index: true
      t.timestamps null: false
    end
  end
end
