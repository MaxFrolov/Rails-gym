class Post < ActiveRecord::Base
  has_many :likes, as: :target, inverse_of: :target, dependent: :delete_all
  has_many :comments, as: :target, inverse_of: :target, dependent: :delete_all
  belongs_to :user

  acts_as_taggable

  enum post_category: { music: 0, technology: 1, sport: 2, nature: 3 }

  mount_uploader :image, BaseUploader
end
