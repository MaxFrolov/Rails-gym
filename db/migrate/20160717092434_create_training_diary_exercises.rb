class CreateTrainingDiaryExercises < ActiveRecord::Migration
  def change
    create_table :training_diary_exercises do |t|
      t.integer :weight
      t.integer :repetition
      t.references :training_diary
      t.timestamps null: false
    end
  end
end
