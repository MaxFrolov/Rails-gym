class CreatePlans < ActiveRecord::Migration
  def change
    create_table :plans do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone
      t.string :email
      t.integer :plan
      t.timestamps null: false
    end
  end
end
