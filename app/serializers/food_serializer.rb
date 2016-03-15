class FoodSerializer < ActiveModel::Serializer
  attributes :id, :category, :header, :food_description, :short_description, :image_url, :likes_count, :comments_count

  has_many :comments, :polymorphic => true, serializer: CommentSerializer
  has_many :likes, :polymorphic => true, serializer: LikeSerializer
end
