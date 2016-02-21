class CommentSerializer < ActiveModel::Serializer
  attributes :id, :email, :message, :name, :created_at

  has_one :user, serializer: UserAvatarSerializer
end
