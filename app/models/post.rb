class Post < ActiveRecord::Base
  has_many :likes, as: :target, inverse_of: :target, dependent: :delete_all
  has_many :comments, as: :target, inverse_of: :target, dependent: :delete_all
  belongs_to :user

  acts_as_taggable

  enum post_category: { programs: 0, stretching: 1, exercises: 2, cardio: 3, muscle_groups: 4,
                        tips_and_advice: 5, gyms: 6, trainers: 7, research: 8 }

  default_scope { order(created_at: :desc) }

  mount_uploader :image, Post::ImageUploader
end
