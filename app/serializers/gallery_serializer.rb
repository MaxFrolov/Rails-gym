class GallerySerializer < ActiveModel::Serializer
  attributes :id, :likes_count, :comments_count, :photo, :description, :created_at

  has_many :comments, :polymorphic => true, serializer: CommentSerializer
  has_many :likes, :polymorphic => true, serializer: LikeSerializer
end
