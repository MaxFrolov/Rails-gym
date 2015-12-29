class Food < ActiveRecord::Base
  has_many :user_advices
  has_many :users, through: :user_advices
  has_many :comments

  enum category: { set_weight: 0, weight_loss: 1, diet: 2, healthy_eating: 3 }

  mount_uploader :image, AvatarUploader
end
