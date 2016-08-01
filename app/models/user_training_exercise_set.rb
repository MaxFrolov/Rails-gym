class UserTrainingExerciseSet < ActiveRecord::Base
  belongs_to :user_training_exercise

  default_scope { order(:set) }

  def label_for_admin
    "вес: #{weight}, повторений: #{repetition}"
  end
end
