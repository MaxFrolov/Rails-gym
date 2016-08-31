class Workout < ActiveRecord::Base
  has_many :exercises
  has_many :categories, as: :target, inverse_of: :target, dependent: :delete_all

  enum level: { beginner: 0, intermediate: 1, advanced: 2 }

  mount_uploader :image, Workout::ImageUploader
end
