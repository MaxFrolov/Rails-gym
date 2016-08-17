class CreateListOfExercises < ActiveRecord::Migration
  def change
    create_table :list_of_exercises do |t|
      t.string :title
      t.integer :level
      t.timestamps null: false
    end
  end
end
