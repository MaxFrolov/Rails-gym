class Product < ActiveRecord::Base
  mount_uploader :image_product, AvatarUploader

  enum category: { amino_acids: 0, gainer: 1, creatine: 2, protein: 3, vitamins: 4 }
end
