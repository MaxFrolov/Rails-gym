class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :title, :subtitle, :description, :sets, :reps, :likes_count,
             :comments_count, :time, :type

  has_many :comments, :polymorphic => true, serializer: CommentSerializer
  has_many :likes, :polymorphic => true, serializer: LikeSerializer
end
