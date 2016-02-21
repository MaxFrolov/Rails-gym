class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :message
      t.string :name
      t.string :email
      t.integer :likes_count, default: 0, null: false
      t.belongs_to :user, index: true
      t.belongs_to :target, polymorphic: true
      t.timestamps null: false
    end
  end
end
