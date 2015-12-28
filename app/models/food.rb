class Food < ActiveRecord::Base
  has_many :user_advices
  has_many :users, through: :user_advices

  mount_uploader :image, AvatarUploader
end
