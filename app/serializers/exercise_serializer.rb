class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :title, :subtitle, :description, :sets, :reps, :likes_count,
             :comments_count, :time, :type
end
