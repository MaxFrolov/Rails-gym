class UserAdvices < ActiveRecord::Migration
  def change
    create_table :advices do |t|
      t.belongs_to :user, index: true
      t.belongs_to :food, index: true
      t.timestamps null: false
    end
  end
end
