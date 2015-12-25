class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :message
      t.string :name
      t.string :email
      t.datetime :comment_date
      t.references :user, index: true
      t.references :post, index: true
      t.references :food, index: true
      t.timestamps null: false
    end
  end
end
