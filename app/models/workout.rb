class Workout < ActiveRecord::Base
  has_many :exercises

  enum category: { fat_burning: 0, cardio: 1,  body_weight: 2 }
  enum level: { beginner: 0, intermediate: 1, advanced: 2 }

  mount_uploader :image, Base
end
