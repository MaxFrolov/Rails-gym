class CommentSerializer < ActiveModel::Serializer
  attributes :id, :email, :message, :name, :comment_date

  has_one :user, serializer: UserAvatarSerializer
end
