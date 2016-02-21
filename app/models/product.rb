class Product < ActiveRecord::Base
  has_many :order_items
  has_many :likes, as: :target, inverse_of: :target, dependent: :delete_all
  has_many :comments, as: :target, inverse_of: :target, dependent: :delete_all
  mount_uploader :image_product, BaseUploader

  enum category: { amino_acids: 0, gainer: 1, creatine: 2, protein: 3, vitamins: 4 }
end
