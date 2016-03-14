class Workout < ActiveRecord::Base
  mount_uploader :image, BaseUploader
end
