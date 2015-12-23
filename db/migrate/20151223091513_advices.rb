class Advices < ActiveRecord::Migration
  def change
    create_table :advices do |t|
      t.belongs_to :user, index: true
      t.belongs_to :diet_advice, index: true
      t.timestamps null: false
    end
  end
end
