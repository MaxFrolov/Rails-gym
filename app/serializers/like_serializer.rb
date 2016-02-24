class LikeSerializer < ActiveModel::Serializer
  attributes :id, :target_id, :target_type, :created_at

  has_one :target, polymorphic: true
  def target
    object.target.active_model_serializer
  end
end
