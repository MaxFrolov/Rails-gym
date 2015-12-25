class Post < ActiveRecord::Base
  has_many :comments
  belongs_to :user

  enum post_category: { music: 0, technology: 1, sport: 2, nature: 3 }

  mount_uploader :image, AvatarUploader
end
