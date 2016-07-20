class TrainingDiarySerializer < ActiveModel::Serializer
  attributes :id, :exercise, :sets, :date

  has_many :training_diary_exercises
end
