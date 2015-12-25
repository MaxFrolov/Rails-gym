class PostSerializer < ActiveModel::Serializer
  attributes :id, :short_description, :image_url, :post_date, :post_description, :header, :post_category

  has_many :comments
end
