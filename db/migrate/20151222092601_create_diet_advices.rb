class CreateDietAdvices < ActiveRecord::Migration
  def change
    create_table :diet_advices do |t|
      t.string :category
      t.string :header
      t.string :description
      t.string :short_description
      t.string :image
      t.timestamps null: false
    end
  end
end
