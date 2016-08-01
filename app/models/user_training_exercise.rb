class UserTrainingExercise < ActiveRecord::Base
  has_many :user_training_exercise_sets
  belongs_to :users_training
  belongs_to :list_of_exercise

  accepts_nested_attributes_for :user_training_exercise_sets, allow_destroy: true

  def label_for_admin
    "#{self.list_of_exercise.title}, #{sets} подходов"
  end
end
