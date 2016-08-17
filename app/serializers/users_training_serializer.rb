class UsersTrainingSerializer < ActiveModel::Serializer
  attributes :id, :date

  has_many :user_training_exercises
end
