class CreateLiqpayCallbacks < ActiveRecord::Migration
  def change
    create_table :liqpay_callbacks do |t|
      t.references :order, index: true, foreign_key: true
      t.integer :status
      t.json :decoded_data

      t.timestamps null: false
    end
  end
end
