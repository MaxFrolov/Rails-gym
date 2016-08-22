class Food < ActiveRecord::Base
  has_many :likes, as: :target, inverse_of: :target, dependent: :delete_all
  has_many :comments, as: :target, inverse_of: :target, dependent: :delete_all
  has_many :categories, as: :target, inverse_of: :target, dependent: :delete_all

  acts_as_taggable

  mount_uploader :image, Base
end
