class CreateItemsCategories < ActiveRecord::Migration
  def change
    create_table :items_categories do |t|
      t.belongs_to :target, :polymorphic => true
      t.references :category, index: true
      t.timestamps null: false
    end
  end
end
