class Gallery < ActiveRecord::Base
  has_many :comments, as: :target, inverse_of: :target, dependent: :delete_all
  has_many :likes, as: :target, inverse_of: :target, dependent: :delete_all

  mount_uploader :photo, Gallery::ImageUploader
end
