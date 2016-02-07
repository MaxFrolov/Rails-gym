class CreateWorkouts < ActiveRecord::Migration
  def change
    create_table :workouts do |t|
      t.integer :category
      t.string :header
      t.string :workout_description
      t.string :short_description
      t.string :image
      t.integer :reps
      t.timestamps null: false
    end
  end
end
