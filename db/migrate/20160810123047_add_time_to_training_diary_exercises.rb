class AddTimeToTrainingDiaryExercises < ActiveRecord::Migration
  def change
    add_column :training_diary_exercises, :time, :integer
  end
end
