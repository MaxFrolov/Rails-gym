class Workout < ActiveRecord::Base
  has_many :exercises
  has_many :items_categories, as: :target
  has_many :categories, through: :items_categories

  enum level: { beginner: 0, intermediate: 1, advanced: 2 }

  mount_uploader :image, Workout::ImageUploader
end
