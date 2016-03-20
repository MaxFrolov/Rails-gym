class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :subtitle, :start_date, :end_date, :image_url, :description

  has_many :comments, :polymorphic => true, serializer: CommentSerializer
end
