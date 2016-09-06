class Food < ActiveRecord::Base
  has_many :likes, as: :target, inverse_of: :target, dependent: :delete_all
  has_many :comments, as: :target, inverse_of: :target, dependent: :delete_all
  has_many :items_categories, as: :target
  has_many :categories, through: :items_categories

  acts_as_taggable

  mount_uploader :image, Food::ImageUploader
end
