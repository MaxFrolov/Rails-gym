class UserTrainingExerciseSerializer < ActiveModel::Serializer
  attributes :id, :sets, :exercise

  def exercise
    object.list_of_exercise.title
  end

  has_many :user_training_exercise_sets
end
