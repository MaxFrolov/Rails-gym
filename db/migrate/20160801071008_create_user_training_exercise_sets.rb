class CreateUserTrainingExerciseSets < ActiveRecord::Migration
  def change
    create_table :user_training_exercise_sets do |t|
      t.integer :set
      t.integer :weight
      t.integer :repetition
      t.references :user_training_exercise
      t.timestamps null: false
    end
  end
end
