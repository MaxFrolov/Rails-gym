class FoodSerializer < ActiveModel::Serializer
  attributes :id, :category, :header, :food_description, :short_description, :image_url
end
