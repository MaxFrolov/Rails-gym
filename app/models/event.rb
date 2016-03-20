class Event < ActiveRecord::Base
  belongs_to :user
  has_many :likes, as: :target, inverse_of: :target, dependent: :delete_all
  has_many :comments, as: :target, inverse_of: :target, dependent: :delete_all
  mount_uploader :image, Base

end
