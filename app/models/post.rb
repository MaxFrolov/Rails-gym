class Post < ActiveRecord::Base
  has_many :likes, as: :target, inverse_of: :target, dependent: :delete_all
  has_many :comments, as: :target, inverse_of: :target, dependent: :delete_all
  has_many :items_categories, as: :target
  has_many :categories, through: :items_categories
  belongs_to :user

  acts_as_taggable

  default_scope { order(created_at: :desc) }

  mount_uploader :image, Post::ImageUploader
end
