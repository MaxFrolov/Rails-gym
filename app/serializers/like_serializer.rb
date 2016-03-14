class LikeSerializer < ActiveModel::Serializer
  attributes :id, :target_id, :target_type, :created_at, :user_id

end
