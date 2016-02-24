class CommentSerializer < ActiveModel::Serializer
  attributes :id, :email, :message, :name, :likes_count, :created_at

  has_one :user, serializer: UserAvatarSerializer
  has_many :likes, :polymorphic => true, serializer: LikeSerializer
end
