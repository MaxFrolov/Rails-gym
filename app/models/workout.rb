class Workout < ActiveRecord::Base
  mount_uploader :image, AvatarUploader
end
