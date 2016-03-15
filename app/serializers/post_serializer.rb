class PostSerializer < ActiveModel::Serializer
  attributes :id, :short_description, :image_url, :created_at, :post_description, :header, :post_category,
             :likes_count, :comments_count

  has_many :comments, :polymorphic => true, serializer: CommentSerializer
  has_many :likes, :polymorphic => true, serializer: LikeSerializer
end
