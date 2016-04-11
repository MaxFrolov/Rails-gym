class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :image, :category, :level, :title, :subtitle, :description
end
