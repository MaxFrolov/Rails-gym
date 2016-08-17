class TrainingDiarySerializer < ActiveModel::Serializer
  attributes :id, :sets, :date, :exercise, :exercise_id, :measuring

  def exercise
    object.list_of_exercise.title
  end

  def exercise_id
    object.list_of_exercise.id
  end

  def measuring
    object.list_of_exercise.measuring
  end

  has_many :training_diary_exercises
end
