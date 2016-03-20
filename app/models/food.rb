class Food < ActiveRecord::Base
  has_many :user_advices
  has_many :users, through: :user_advices
  has_many :likes, as: :target, inverse_of: :target, dependent: :delete_all
  has_many :comments, as: :target, inverse_of: :target, dependent: :delete_all

  acts_as_taggable

  enum category: { set_weight: 0, weight_loss: 1, diet: 2, healthy_eating: 3 }

  mount_uploader :image, Base
end
