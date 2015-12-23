class DietAdvice < ActiveRecord::Base
  has_many :advices
  has_many :users, through: :advices

  mount_uploader :image, AvatarUploader
end
