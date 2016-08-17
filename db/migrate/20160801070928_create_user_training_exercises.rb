class CreateUserTrainingExercises < ActiveRecord::Migration
  def change
    create_table :user_training_exercises do |t|
      t.integer :sets
      t.references :users_training, index: true
      t.references :list_of_exercise, index: true
      t.timestamps null: false
    end
  end
end
