class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :category, :level, :title, :subtitle, :description
end
