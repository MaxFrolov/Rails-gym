class CreateWorkouts < ActiveRecord::Migration
  def change
    create_table :workouts do |t|
      t.string :title
      t.string :subtitle
      t.string :image
      t.integer :level
      t.timestamps null: false
    end
  end
end
