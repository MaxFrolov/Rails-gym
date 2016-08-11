class AddTimeToUserTrainingExerciseSets < ActiveRecord::Migration
  def change
    add_column :user_training_exercise_sets, :time, :integer
  end
end
