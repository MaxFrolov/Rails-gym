class Exercise < ActiveRecord::Base
  belongs_to :workout

  mount_uploader :image, Base
end
