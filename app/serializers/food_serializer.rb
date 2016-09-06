class FoodSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :subtitle, :image, :likes_count, :comments_count

  has_many :comments, :polymorphic => true, serializer: CommentSerializer
  has_many :likes, :polymorphic => true, serializer: LikeSerializer
  has_many :categories, serializer: CategorySerializer
end
