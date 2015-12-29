class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :header
      t.string :short_description
      t.string :description
      t.datetime :start_date
      t.datetime :end_date
      t.string :image
      t.references :user, index: true
      t.timestamps null: false
    end
  end
end
