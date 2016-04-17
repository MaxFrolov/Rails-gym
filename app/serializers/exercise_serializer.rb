class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :title, :subtitle, :image_url, :description, :sets, :reps

  has_one :workout
end
