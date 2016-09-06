class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :image, :level, :title, :subtitle

  has_many :categories, serializer: CategorySerializer
end
