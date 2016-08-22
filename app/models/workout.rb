class Workout < ActiveRecord::Base
  has_many :exercises

  enum level: { beginner: 0, intermediate: 1, advanced: 2 }

  mount_uploader :image, Workout::ImageUploader
end
