class TrainingDiarySerializer < ActiveModel::Serializer
  attributes :id, :sets, :date, :exercise

  def exercise
    object.list_of_exercise.title
  end

  has_many :training_diary_exercises
end
