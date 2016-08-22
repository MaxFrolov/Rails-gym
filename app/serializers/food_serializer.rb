class FoodSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :subtitle, :image_url, :likes_count, :comments_count

  has_many :comments, :polymorphic => true, serializer: CommentSerializer
  has_many :likes, :polymorphic => true, serializer: LikeSerializer
  has_many :categories, :polymorphic => true, serializer: CategorySerializer
end
