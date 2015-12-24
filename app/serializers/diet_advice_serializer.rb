class DietAdviceSerializer < ActiveModel::Serializer
  attributes :id, :category, :header, :description, :short_description, :image_url
end
