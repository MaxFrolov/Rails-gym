class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :price, :product_description, :image_product_url, :composition, :recommendation_for_use,
             :grams, :count, :sale
end
