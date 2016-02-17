class CreateOrderedUsers < ActiveRecord::Migration
  def change
    create_table :ordered_users do |t|
      t.string :first_name
      t.string :last_name
      t.string :company_name
      t.string :email
      t.integer :phone
      t.string :city
      t.string :country
      t.string :address
      t.string :order_notes
      t.references :user, index: true
      t.references :order, index: true

      t.timestamps null: false
    end
  end
end
