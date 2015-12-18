class PostSerializer < ActiveModel::Serializer
  attributes :id, :short_description, :picture_url, :news_date, :news, :header, :post_category

  has_many :comments
end
